
export function createArray(n) {
    return Array.from({ length: n }, (_, i) => i);
}

export function sliceString(string, showMore) {
    if (showMore) return string;
    return string.slice(0, 50) + "...";
}

export function extractDebouncedSearchQuery(restaurants) {
    const data = [];
    restaurants.forEach((restaurant) => {
        const restaurantId = restaurant.id;
        const restaurantName = restaurant.name;
        restaurant.sections.forEach((section) => {
            const sectionId = section.id;
            if (section.menu) {
                section.menu.forEach((item) => {
                    const itemId = item.id;
                    const itemImageUrl = item.imageUrl;
                    data.push({
                        restaurantId,
                        sectionId,
                        restaurantName,
                        itemId,
                        itemImageUrl,
                        itemName: item.name,
                    });
                });
            }
        });
    });
    return data;
}
export function extractPopularItems(restaurants) {
    const data = [];
    restaurants.forEach((restaurant) => {
        const restaurantId = restaurant.id;
        const restaurantName = restaurant.name;
        restaurant.sections.forEach((section) => {
            const sectionId = section.id;
            if (section.menu) {
                section.menu.forEach((item) => {
                    data.push({
                        restaurantId,
                        sectionId,
                        restaurantName,
                        item: {
                            id: item.id,
                            name: item.name,
                            imageUrl: item.imageUrl,
                            price: item.price,
                            isVeg: item.isVeg,
                            kCal: item.kCal,
                            servings: item.servings,
                            preparationTime: item.preparationTime,
                            tags: item.tags,
                        }
                    });
                });
            }
        });
    });
    return data;
}
