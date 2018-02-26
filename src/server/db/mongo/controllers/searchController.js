import Activity from '../models/activity_model';

export function search(req, res, next) {
  const queryText = req.body.text || '*';
  const min_age = req.body.min_age || 0;
  const max_age = req.body.max_age || 20;
  const min_price = req.body.min_price || 0;
  const max_price = req.body.max_price || 100;
  const distance = req.body.distance || 100000;

  const elasticQuery = {
    bool: {
      must: {
        multi_match: {
          query: queryText,
          fields: ['name', 'description', 'tags'],
          fuzziness: 1,
          prefix_length: 1
        }
      },
      filter: {
        bool: {
          must: [
            {
              range: {
                price: {
                  lte: max_price,
                  gte: min_price
                },
              }
            },
            {
              range: {
                max_age: {
                  lte: max_age,
                },
              }
            },
            {
              range: {
                min_age: {
                  gte: min_age,
                },
              }
            },
            {
              range: {
                available_tickets: {
                  gt: 0,
                },
              }
            }
          ]
        }
      }
    }
  };

  Activity.search(
    elasticQuery,
    (err, results) => {
    if (err) next(err);
    console.log(results);
    return res.send(results);
  });
}

export default {
  search
};
