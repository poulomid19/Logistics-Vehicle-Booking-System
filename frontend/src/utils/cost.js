export const estimatedCost =(capacitykg, duration)=>{
    const BASE_FARE = 500;
    const COST_PER_HOUR = 100;
    const COST_PER_KG = 1

return (
    BASE_FARE +
    COST_PER_HOUR * duration +
    capacitykg * COST_PER_KG
)
}