import Activity from '../models/activity_model';

function processResults(results) {
  const hits = results.hits.total;
  if (hits === 0) return [];
  const data = results.hits.hits;
  return data.map((value) => {
    return {
      activityId: value._id,
      activityURL: `/api/activity/${value._id}`,
      name: value._source.name,
      description: value._source.description,
      min_age: value._source.min_age,
      max_age: value._source.max_age,
      price: value._source.price,
      tags: value._source.tags
    };
  });
}

// Currently default region is assumed to be 10km from
// Athens
export function search(req, res, next) {
  const queryText = req.body.text || '*';
  const min_age = req.body.min_age || 0;
  const max_age = req.body.max_age || 20;
  const min_price = req.body.min_price || 0;
  const max_price = req.body.max_price || 1000;
  const distance = req.body.distance || 10;
  const lat_lon = req.body.lat_lon || '37.983,23.733';

  const elasticQuery = {
    bool: {
      must: {
        multi_match: {
          query: queryText,
          analyzer: 'greek',
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
              geo_distance: {
                distance: `${distance}km`,
                geo_location: lat_lon
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
      console.log(results);
      if (err) return next(err);
      const searchOutput = processResults(results);
      return res.send(searchOutput);
  });
}

export default {
  search
};
