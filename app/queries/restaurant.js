const { client } = require("../sanity.config")

export const getHomePageRestaurants = () => {
    return client.fetch(`*[_type == 'restaurant'] {
        _id,
        name,
        isActive,
       'imageUrl':image.asset->url
      }`)
}

export const getRestaurant = (id) => {
    return client.fetch(`*[_type == 'restaurant' && _id == $id][0] {
        _id,
        name,
        tags,
        description,
        'imageUrl': image.asset->url,
        'bannerUrl': banner.asset->url,
        'sections': sections[] {
          'id': _key,
          name
        }
      }`, { id })
}

export const getRestaurantSections = (restaurantId) => {
    return client.fetch(`*[_type == 'restaurant' && _id == $restaurantId][0] {
        name,
        sections[] {
          'id': _key,
          name,
           menu[]{
             'id':_key,
             isVeg,
             name,
             categories[]{
             'id':_key,
               isRequired,
               name,
               requiredItems,
               items[]->{
                 'id': _id,
                  name,
                  price,
                  mrp,
                  quantity,
                  isVeg,
                  preparationTime,
                  servings,
                  "photo": photo.asset->url,
                  nutrition
               }
            }    
          }
        }
      }      
      `, { restaurantId })
}