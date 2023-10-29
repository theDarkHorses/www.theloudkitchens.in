import { CANCELLED, COOKING, DELIVERED, OUTFORDELIVERY, PENDING } from "./constants";

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
    return roundWithPrecision(totalAmount * 0.05, 2)
}

export function roundWithPrecision(num, precision = 2) {
    var multiplier = Math.pow(10, precision);
    return Math.round(num * multiplier) / multiplier;
}

export function deliveryStatusColor(status) {
    switch (status) {
        case PENDING:
            return 'bg-yellow-500'
        case COOKING:
            return 'bg-yellow-500'
        case OUTFORDELIVERY:
            return 'bg-yellow-500'
        case DELIVERED:
            return 'bg-green-500 animate-none'
        case CANCELLED:
            return 'bg-red-500 animate-none'
        default:
            return 'bg-yellow-500'
    }
}
