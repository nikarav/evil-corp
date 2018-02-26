import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';

import { USER_TYPES } from '../../../../config/userTypes';

const ActivitySchema = new mongoose.Schema({
  name: { type: String, required: true, es_indexed: true, es_analyzer: 'greek' },
  geo_location: { type: String, required: true, es_type: 'geo_point', es_indexed: true },
  description: { type: String, required: true, es_indexed: true, es_analyzer: 'greek' },
  date: { type: Date, required: true },
  photo: {
    data: {
      type: Buffer, es_indexed: false
    },
    contentType: {
      type: String, es_indexed: false
    },
     es_indexed: false
  },
  total_tickets: { type: Number, min: 0, required: true },
<<<<<<< HEAD
  available_tickets: { type: Number, min: 0},
  min_age: { type: Number, min: 3, default: 3 },
  max_age: { type: Number, min: 3, max: 16, default: 16 },
  tags: [String],
  price: { type: Number, min: 0, required: true },
=======
  available_tickets: { type: Number, min: 0 },
  min_age: { type: Number, min: 3, default: 3, es_indexed: true },
  max_age: { type: Number, min: 3, max: 16, default: 16, es_indexed: true },
  tags: { type: [String], es_indexed: true, es_analyzer: 'greek' },
  price: { type: Number, min: 0, required: true, es_indexed: true },
>>>>>>> 90c94a97a28c534ff745efedac6b52270c60b65c
  provider: { type: mongoose.Schema.Types.ObjectId, ref: USER_TYPES.Provider, require: true },
  locked: { type: Boolean, default: false }, // true in case provider is locked
  pendingTransactions: [{ type: mongoose.Schema.Types.ObjectId, default: [] }]
}, {
  toJSON: {
  virtuals: true
  },
  toObject: {
  virtuals: true
  }
});

ActivitySchema.virtual('is_active').get(function () {
  return Date.now() < this.date;
});

ActivitySchema.virtual('sold_tickets').get(function () {
  return this.total_tickets - this.available_tickets;
});

ActivitySchema.plugin(mongoosastic, {
  index: 'activities'
});

const ActivityModel = mongoose.model('Activity', ActivitySchema);

ActivityModel.createMapping({
  analysis: {
    filter: {
      greek_stop: {
        type: 'stop',
        stopwords: '_greek_'
      },
      greek_lowercase: {
        type: 'lowercase',
        language: 'greek'
      },
      greek_stemmer: {
        type: 'stemmer',
        language: 'greek'
      }
    },
    analyzer: {
      greek: {
        tokenizer: 'standard',
        filter: [
          'greek_lowercase',
          'greek_stop',
          'greek_stemmer'
        ]
      }
    }
  }
}, (err, mapping) => {
  if (err) console.log(err);
});

export default ActivityModel;
