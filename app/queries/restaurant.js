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
             price,
             kCal,
             'imageUrl':image.asset->url,
             description,
              mrp,
              isAvailable,
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


export function getCuisine(restaurantId, sectionId, cuisineId) {
  return client.fetch(`*[_type == 'restaurant' && _id == $restaurantId][0].sections[_key == $sectionId][0].menu[_key == $cuisineId][0] {
    'id':_key,
    name,
    description,
    price,
  'imageUrl':image.asset->url,
    mrp,
    isAvailable,
    kCal,
    isVeg,
    categories[]{
      name,
      isRequired,
      requiredItems,
      items[]->{
        name,
        price,
        mrp,
        quantity,
        photo,
        isVeg,
        preparationTime,
        servings,
        nutrition
      }
    }
  }
  `, { restaurantId, sectionId, cuisineId })


}


export const getHomeCarouselImageUrls = () => {
  return client.fetch(`*[_type == 'carousel'][0]{
    'imageUrls': images[].asset->url
  }
  `)
}

export const searchCusine = (query) => {
  return client.fetch(`*[_type == 'restaurant']{
    'id':_id,
    name,
    sections[]{
      'id':_key,
      menu[_type=='cuisine' && name match $query]{
        'id':_key,
        name,
        'imageUrl':image.asset->url
      }
    }
  }`, { query: `*${query}*` })
}


export const getPopularItems = () => {
  return client.fetch(`*[_type == 'restaurant']{
    'id':_id,
    name,
    sections[]{
      'id':_key,
      menu[_type=='cuisine' && isPopular == true]{
        'id':_key,
          isVeg,
          tags,
          kCal,
          servings,
          preparationTime,
    price,
        name,
        'imageUrl':image.asset->url
      }
    }
  }`)

}