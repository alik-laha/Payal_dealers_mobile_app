import { LotKey, LotSection } from "./types/apiResponse.type";

export const LOT_DATA: Record<LotKey, LotSection> = {
  boil: { lotKey: 'latestLotboil', backlogKey: 'backlogMayurdata' },
  scoop: { lotKey: 'latestLotscoop', backlogKey: 'backlogscoopdata' },
  borma: { lotKey: 'latestLotborma', vLotKey: 'latestvLotborma', backlogKey: 'backlogbormadata' },
  humid: { lotKey: 'latestLothumid', vLotKey: 'latestvLothumid', backlogKey: 'backloghumiddata' },
  peel: { lotKey: 'latestLotpeel', vLotKey: 'latestvLotpeel', backlogKey: 'backlogpeeldata' },
  Mayur: { lotKey: 'latestLotMayur', vLotKey: 'latestVLotMayur', backlogKey: 'backlogMayurdata' },
  hamsa: { lotKey: 'latestLothamsa', vLotKey: 'latestVLothamsa', backlogKey: 'backloghamsadata' },
  wholes: { lotKey: 'latestLotwholes', vLotKey: 'latestvLotwholes', backlogKey: 'backlogwholesdata' },
  lw: { lotKey: 'latestLotlw', vLotKey: 'latestvLotlw', backlogKey: 'backloglwdata' },
  dpds: { lotKey: 'latestLotdpds', vLotKey: 'latestvLotdpds', backlogKey: 'backlogdpdsdata' },
  sorting: { lotKey: 'latestLotsorting', vLotKey: 'latestvLotsorting', backlogKey: 'backlogsortingdata' },
  bigT: { lotKey: 'latestLotbigT', vLotKey: 'latestvLotbigT', backlogKey: 'backlogbigTdata' },
  vil: { lotKey: 'latestLotvil', vLotKey: 'latestvLotvil', backlogKey: 'backlogvildata' },
  rej: { lotKey: 'latestLotrej', vLotKey: 'latestvLotrej', backlogKey: 'backlogrejdata' },
}