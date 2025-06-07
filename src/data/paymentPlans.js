// src/data/paymentPlans.js
export const dailyPaymentPlansData = [
  { punctualDays: 36, noDiscountDays: 47, dailyCoefficient: 0.0375, name: "Plan 36 Días" },
  { punctualDays: 61, noDiscountDays: 72, dailyCoefficient: 0.0305, name: "Plan 61 Días" },
  { punctualDays: 91, noDiscountDays: 102, dailyCoefficient: 0.0247, name: "Plan 91 Días" },
  { punctualDays: 121, noDiscountDays: 132, dailyCoefficient: 0.0213, name: "Plan 121 Días" },
  { punctualDays: 181, noDiscountDays: 192, dailyCoefficient: 0.0161, name: "Plan 181 Días" },
  { punctualDays: 241, noDiscountDays: 252, dailyCoefficient: 0.0130, name: "Plan 241 Días" },
  { punctualDays: 281, noDiscountDays: 292, dailyCoefficient: 0.0120, name: "Plan 281 Días" },
  { punctualDays: 331, noDiscountDays: 342, dailyCoefficient: 0.0110, name: "Plan 331 Días" },
];

// Función para calcular los detalles de todos los planes basados en un precio de contado
export const calculateAllPlanDetails = (cashPrice) => {
  if (!cashPrice || cashPrice <= 0) return [];

  return dailyPaymentPlansData.map(planBase => {
    const dailyPayment = cashPrice * planBase.dailyCoefficient;
    const weeklyPayment = dailyPayment * 6;

    return {
      // Detalles del Plan Pago Puntual
      punctual: {
        planType: 'Pago Puntual',
        name: `${planBase.name} (Puntual)`,
        days: planBase.punctualDays,
        dailyPayment: parseFloat(dailyPayment.toFixed(2)),
        weeklyPayment: parseFloat(weeklyPayment.toFixed(2)),
        totalToPay: parseFloat((dailyPayment * planBase.punctualDays).toFixed(2)),
        coefficient: planBase.dailyCoefficient, // Guardamos el coeficiente por si acaso
      },
      // Detalles del Plan Sin Descuento
      noDiscount: {
        planType: 'Sin Descuento',
        name: `${planBase.name.replace(' Días', '')} ${planBase.noDiscountDays} Días (Sin Descuento)`,
        days: planBase.noDiscountDays,
        dailyPayment: parseFloat(dailyPayment.toFixed(2)), // Misma cuota diaria
        weeklyPayment: parseFloat(weeklyPayment.toFixed(2)), // Misma cuota semanal
        totalToPay: parseFloat((dailyPayment * planBase.noDiscountDays).toFixed(2)),
        coefficient: planBase.dailyCoefficient,
      }
    };
  });
};