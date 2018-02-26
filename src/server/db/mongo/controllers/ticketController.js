import crypto from 'crypto';
import PDFDocument from 'pdfkit';
import codes from 'rescode';
import moment from 'moment';
import Ticket from '../models/ticket_model';
import Activity from '../models/activity_model';
import ParentProfile from '../models/parent_model';
import { sendEmail } from '../controllers/emailController';
import Transactions from '../models/transaction_model';
import mongoose from 'mongoose';



function generateTicketNumber(string) {
  const h = crypto.createHash('sha1');
  h.update(string);
  const len = 13;
  return parseInt(h.digest('hex').slice(0, len + 1), 16).toString().slice(0, len);
}

export function buyTicket(req, res, next) {
  const activityId = req.body.activityId;
  const numberOfTickets = Number(req.body.numberOfTickets);
  const profileId = req.user.profile.id;
  const ticket = new Ticket({
    activity: activityId,
    parent: profileId,
    numberOfTickets: numberOfTickets
  });
  // Generate ticket barcode number
  ticket.ticketNumber = generateTicketNumber(ticket.id);

  if( numberOfTickets <=0 || numberOfTickets >10){
    return res.status(400).send('Number of tickets should be between 1 and 10.');
  }
  Activity.findById(activityId, (err, data) => {
    if (!data) return res.status(400).send('Unavailable activity');
    if (err) return next(err);
    if (data.available_tickets <= 0) return res.status(400).send('Sold out');
    if (data.available_tickets < numberOfTickets) return res.status(400).send('Not enough tickets');
    const price = data.price;
    ParentProfile.findById(profileId, (err, profile) => {
      if (err) return next(err);
      const credits = profile.credits;
      if( credits < (price * numberOfTickets)){
        return res.status(400).send('Not enough credits');
      }
      const before_div = parseInt((profile.numberOfTickets)/10);
      const after_div = parseInt((profile.numberOfTickets + numberOfTickets)/10);
      var creditsUpdated = credits - price * numberOfTickets;
      if( before_div != after_div) {
        var creditsUpdated = creditsUpdated + 10;
      }
      return data.update({ $inc: { available_tickets: -numberOfTickets } }, (err) => {
        if (err) return next(err);
        ticket.save((err) => {
          if (err) return next(err);
          return ParentProfile.findByIdAndUpdate(
            profileId, { $push: { tickets: ticket}, $inc: { numberOfTickets: +numberOfTickets}, $set: { credits: creditsUpdated } }, { new: true }, (err, profile) => {
              if (err) return next(err);
              return res.send(profile);
            });
          });
        });
    });
  });
}

export function buyTickettwophasecommit(req, res, next) {
  const activityId = req.body.activityId;
  const numberOfTickets = Number(req.body.numberOfTickets);
  const profileId = req.user.profile.id;
  const ticket = new Ticket({
    activity: activityId,
    parent: profileId,
    numberOfTickets: numberOfTickets
  });
  // Generate ticket barcode number
  ticket.ticketNumber = generateTicketNumber(ticket.id);



  if( numberOfTickets <=0 || numberOfTickets >10){
    return res.status(400).send('Number of tickets should be between 1 and 10.');
  }
  Activity.findById(activityId, (err, data) => {
    if (!data) return res.status(400).send('Unavailable activity');
    if (err) return next(err);
    if (data.available_tickets <= 0) return res.status(400).send('Sold out');
    if (data.available_tickets < numberOfTickets) return res.status(400).send('Not enough tickets');
    const price = data.price;
    ParentProfile.findById(profileId, (err, profile) => {
      if (err) return next(err);
      const credits = profile.credits;
      if( credits < (price * numberOfTickets)){
        return res.status(400).send('Not enough credits');
      }
      const before_div = parseInt((profile.numberOfTickets)/10);
      const after_div = parseInt((profile.numberOfTickets + numberOfTickets)/10);
      var creditsUpdated = credits - price * numberOfTickets;
      if( before_div != after_div) {
        var creditsUpdated = creditsUpdated + 10;
      }

     const transactions=new Transactions({
         _id: new mongoose.Types.ObjectId(),
         source: profileId,
         destination: activityId,
         value: price* numberOfTickets,
         state: "initial",
         lastModified: new Date()
       })
      transactions.save();
      ticket.save();
      Transactions.findOne({ state: "initial" } , (findErr, t) => {
      Transactions.update({ _id: t._id, state: "initial" },{$set: { state: "pending" },$currentDate: { lastModified: true }},(findErr,trans) => {
      ParentProfile.findByIdAndUpdate({ _id:mongoose.Types.ObjectId(t.source), pendingTransactions: { $ne: t._id } },{ $inc: {numberOfTickets:numberOfTickets }, $set:{ credits: creditsUpdated}, $push: { pendingTransactions: t._id, tickets: ticket } },{ new: true},(findErr,trans2)=> {
      Activity.findByIdAndUpdate({ _id:mongoose.Types.ObjectId(t.destination), pendingTransactions: { $ne: t._id } },{ $inc: { available_tickets: -numberOfTickets }, $push: { pendingTransactions: t._id}}, { new: true}, (findErr, dest)=> {
      Transactions.update({ _id: t._id, state: "pending" },{$set: { state: "applied" },$currentDate: { lastModified: true }}, {new: true}, (findErr,trans5) => {
      ParentProfile.findByIdAndUpdate({ _id:mongoose.Types.ObjectId(t.source), pendingTransactions: t._id },  { $pull: { pendingTransactions: t._id } } , {new: true}, (findErr,profile) => {
      Activity.findByIdAndUpdate({ _id:mongoose.Types.ObjectId(t.destination), pendingTransactions: t._id },  { $pull: { pendingTransactions: t._id } },  {new: true}, (findErr, dest2)=> {
      Transactions.update({ _id: t._id, state: "applied" }, {$set: { state: "done" }, $currentDate: { lastModified: true }},(findErr,trans4) => {


              return res.send(profile);

              });
            });
          });
          });
          });
          });
        });
      });
    });
  });
}

export function generateAndEmailPdf(req, res, next) {
  const ticketId = req.params.ticketId;
  Ticket.findById(ticketId).populate('parent')
                           .populate({ path: 'activity', populate: { path: 'provider' }})
                           .exec((err, ticket) => {
    if (err) return next(err);

    const parentFullname = `${ticket.parent.name} ${ticket.parent.surname}`;
    const parentEmail = ticket.parent.email;
    const price = ticket.activity.price;
    const activityName = ticket.activity.name;
    const activityDate = moment(ticket.activity.date).format('DD-MM-YYYY, Ώρα: HH:mm');
    const providerBrand = ticket.activity.provider.brand_name;
    const date = moment(Date.now()).format('YYYY-MM-DD');
    const ticketNumber = ticket.ticketNumber;
    const numberOfTickets = ticket.numberOfTickets;

    codes.loadModules(['ean2', 'ean5', 'ean8', 'ean13']);
    const barcodeImg = codes.create('ean13', ticketNumber);

    const doc = new PDFDocument();
    const pdfData = [];

    doc.on('data', (data) => {
      if (data) {
        pdfData.push(data);
      }
    });

    doc.registerFont('font', 'server/fonts/dejavusans.ttf');
    doc.fontSize(24);
    doc.text('PLAYGROUND E-TICKET').moveDown(1);
    doc.fontSize(16);
    doc.image(barcodeImg, 400, 58, { width: 130, heigth: 10 });
    doc.font('font').text(`ΟΝΟΜΑΤΕΠΩΝΥΜΟ: ${parentFullname}`).moveDown(0.5);
    doc.font('font').text(`ΔΡΑΣΤΗΡΙΟΤΗΤΑ: ${activityName}`).moveDown(0.5);
    doc.font('font').text(`ΠΑΡΟΧΟΣ: ${providerBrand}`).moveDown(0.5);
    doc.font('font').text(`ΑΡΙΘΜΟΣ ΕΙΣΙΤΗΡΙΩΝ: ${numberOfTickets}€`).moveDown(0.5);
    doc.font('font').text(`ΤΙΜΗ ΚΑΘΕ ΕΙΣΙΤΗΡΙΟΥ: ${price}€`).moveDown(0.5);
    doc.font('font').text(`ΣΥΝΟΛΙΚΟ ΚΟΣΤΟΣ: ${price * numberOfTickets}€`).moveDown(0.5);
    doc.font('font').text(`ΗΜΕΡΟΜΗΝΙΑ: ${activityDate}`);

    const filename = `ticket-${date}.pdf`;
    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');

    const emailBody = 'Καλησπέρα σας, στο συνημμένο αρχείο μπορείτε να βρείτε το ηλεκτρονικό σας εισιτήριο.';

    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(pdfData);
      const mailOptions = {
        from: 'ticketservice@playground.com',
        to: parentEmail,
        text: emailBody,
        subject: 'PLAYGROUND E-TICKET',
        attachments: [{
          filename,
          content: pdfBuffer,
        }]
      };
      sendEmail(mailOptions);
    });

    doc.pipe(res);
    doc.end();
  });
}

export default {
  buyTicket,
  generateAndEmailPdf,
  buyTickettwophasecommit
};
