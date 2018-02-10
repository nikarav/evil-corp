import User from '../models/user_model';

export default (id, done) => {
  User.findById(id).populate('profile').exec((err, user) => {
    done(err, user);
});
};
