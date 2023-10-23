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
    return roundWithPrecision(totalAmount * 0.05,2)
}

export function roundWithPrecision(num, precision = 2) {
    var multiplier = Math.pow(10, precision);
    return Math.round(num * multiplier) / multiplier;
}