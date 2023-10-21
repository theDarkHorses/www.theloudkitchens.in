export function calculateDeliveryFee(totalAmount) {
    if (totalAmount < 150) {
        return 15
    } else if (totalAmount < 200) {
        return 10
    } else {
        return 0
    }
}

export function calculateGST(totalAmount) {
    return totalAmount * 0.05
}