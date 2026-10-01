export type KolkataDataType = {
  backlogMayurdata: { current_backlog: string }[]
  latestLotMayur: { LotNo: string }
  latestVLotMayur: { LotNo: string }
  latestLothamsa: { LotNo: string }
  latestVLothamsa: { LotNo: string }
  backloghamsadata: { current_backlog: string }[]
  latestLotdpds: { LotNo: string }
  latestvLotdpds: { LotNo: string }
  backlogdpdsdata: { current_backlog: string }[]
  latestLotsorting: { LotNo: string }
  latestvLotsorting: { LotNo: string }
  backlogsortingdata: { current_backlog: string }[]
  latestLotwholes: { LotNo: string }
  latestvLotwholes: { LotNo: string }
  backlogwholesdata: { current_backlog: string }[]
  latestLotlw: { LotNo: string }
  latestvLotlw: { LotNo: string }
  backloglwdata: { current_backlog: string }[]
  latestLotbigT: { LotNo: string }
  latestvLotbigT: { LotNo: string }
  backlogbigTdata: { current_backlog: string }[]
  latestLotvil: { LotNo: string }
  latestvLotvil: { LotNo: string }
  backlogvildata: { current_backlog: string }[]
  latestLotrej: { LotNo: string }
  latestvLotrej: { LotNo: string }
  backlogrejdata: { current_backlog: string }[]
  latestLotpeel: { LotNo: string }
  latestvLotpeel: { LotNo: string }
  backlogpeeldata: { current_backlog: string }[]
  latestLotborma: { LotNo: string }
  latestvLotborma: { LotNo: string }
  backlogbormadata: { current_backlog1: string | null; current_backlog2: string | null }[]
  latestLothumid: { LotNo: string }
  latestvLothumid: { LotNo: string }
  backloghumiddata: { current_backlog: string }[]
  latestLotscoop: { LotNo: string }
  latestvLotscoop: { LotNo: string }
  backlogscoopdata: { current_backlog1: string; current_backlog2: string }[]
  latestLotboil: { LotNo: string }
  usercount: number
  employeecount: number
  pendingGatepass: number
  village_pending: number
  village_pending_in: number
  fyReceivingTotal: { Total_Receiving: string }
  village_out_gate: number
  village_out_prod: number
  Ville_Inside_gatepass: { Village_In: string }
  previousBoiling: number
  previousBorma: number
  previousHumid: number
  previousGate: number
  previousBormalab: number
  previousBoilingDate: string
  previousBormaDate: string
  previousHumidDate: string
  previousGateDate: string
  currentWeekBoil: number
  currentWeekBorma: number
  currentWeekBormaLab: number
  currentWeekHumid: number
  weekResultGate: number
  currentMonthBoiling: number
  currentMonthBorma: number
  currentMonthBormaLab: number
  currentMonthHumid: number
  monthResultGate: number
  customBoiling: number
  customBorma: number
  customBormalab: number
  customHumid: number
  customGate: number
  currentYearBoiling: number
  fyResultBorma: { total: string }
  fyResultHumid: { total: string }
  previousscoopDate: string
  previouswholesprcntg: number
  previousbrokenprcntg: number
  previousuncutprcntg: number
  previousnoncutprcntg: number
  previousunscoopprcntg: number
  previousdustprcntg: number
  previousrejectionprcntg: number
  previouskor: number
  previouskorlab: number
  monthlyBrokenAvg: number
  monthlyDustAvg: number
  monthlyNoncutAvg: number
  monthlyUnscoopAvg: number
  monthlyUncutAvg: number
  monthlyKORAvg: number
  monthlyKORAvglab: number
  weeklyBrokenAvg: number
  weeklyDustAvg: number
  weeklyNoncutAvg: number
  weeklyUnscoopAvg: number
  weeklyUncutAvg: number
  weeklyKORAvg: number
  weeklyKORLabAvg: number
  customBrokenAvg: number
  customDustAvg: number
  customNoncutAvg: number
  customUnscoopAvg: number
  customUncutAvg: number
  customKORAvg: number
  customKORAvglab: number
  customBroken: number
  customUnpeel: number
  customChura: number
  currentMonthBroken: number
  currentMonthUnpeel: number
  currentMonthChura: number
  currentWeekBroken: number
  currentWeekUnpeel: number
  currentWeekChura: number
  previousBroken: number
  previousChura: number
  previousUnpeel: number
  previousPeelDate: string
}

export type OriginQuantity = {
  origin: string
  totalQuantity: string
}

export type AfricaData = {
  wareHouses: {
    country: string
    totalStock: string
  }[]

  pLotQuantity: OriginQuantity[]
  moisture8To10: OriginQuantity[]
  moisture10To12: OriginQuantity[]
  moisture12To14: OriginQuantity[]
  moistureAbove14: OriginQuantity[]

  users: { totalUsers: string }[]
  employess: { totalEmp: string }[]

  vendorCount: number
  wareHouseCount: number

  pyMapData: {
    totalQuantity: string
    totalSumMoisture: string
    totalSumRate: string
    totalSumKOR: string
    origin: string
  }[]

  bookedQuantity: OriginQuantity[]
  lossQuantity: { origin: string; lossQuantity: string }[]
  lossPercentage: { origin: string; lossPercentage: number }[]
  pendingMapping: { origin: string; quantity: string }[]
  pendingDry: { origin: string; quantity: string }[]
  lossQuantity2: { origin: string; lossQuantity: number }[]
  qtyAtIdealMoisture: OriginQuantity[]

  IDEAL_MOISTURE_WT: number
}

export type LotKey = 'boil' | 'scoop' | 'borma' | 'humid' | 'peel' | 'Mayur' | 'hamsa' | 'wholes' | 'lw' | 'dpds' | 'sorting' | 'bigT' | 'vil' | 'rej'

export type LotSection = {
  lotKey: keyof KolkataDataType
  vLotKey?: keyof KolkataDataType
  backlogKey: keyof KolkataDataType
}
