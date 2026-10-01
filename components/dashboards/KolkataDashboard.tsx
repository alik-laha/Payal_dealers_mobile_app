import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { KolkataDataType } from '../../types/apiResponse.type'
import CompareTable, { CompareRow } from './kolkata-indore/CompareTable'
import LotCard from './kolkata-indore/LotCard'
import ReportRow from './kolkata-indore/ReportRow'
import Section from './kolkata-indore/Section'
import StatCard from './kolkata-indore/StatCard'
import { safe, TEXT_MUTED, TEXT_PRIMARY, TintKey } from './kolkata-indore/theme'

interface Props {
  data: KolkataDataType
}

type LotItem = {
  label: string
  icon: string
  tint: TintKey
  lot: { LotNo: string | null }
  vLot?: { LotNo: string | null }
  backlog: { current_backlog?: string; current_backlog1?: string | null; current_backlog2?: string | null }[]
}

export default function KolkataDashboard({ data }: Props) {
  const totalReceiving = parseFloat(safe(data.fyReceivingTotal?.Total_Receiving, '0')) / 1000
  const totalBoiling = safe(data.currentYearBoiling, 0) / 1000
  const avgMoistureGain = parseFloat(safe(data.fyResultHumid?.total, '0'))
  const avgBormaLoss = parseFloat(safe(data.fyResultBorma?.total, '0'))
  const villageIn = parseFloat(safe(data.Ville_Inside_gatepass?.Village_In, '0')) / 1000
  const villageOutGate = safe(data.village_out_gate, 0) / 1000
  const villageOutProd = safe(data.village_out_prod, 0) / 1000
  const pendingVillage = safe(data.village_pending, 0) / 1000

  const gatepassRows: CompareRow[] = [
    {
      label: 'Pending',
      prev: safe(data.previousGate, 0),
      week: safe(data.weekResultGate, 0),
      month: safe(data.monthResultGate, 0),
    },
  ]

  const boilingRows: CompareRow[] = [
    {
      label: 'Bag',
      prev: safe(data.previousBoiling, 0) / 1000,
      week: safe(data.currentWeekBoil, 0) / 1000,
      month: safe(data.currentMonthBoiling, 0) / 1000,
    },
  ]

  const scoopingRows: CompareRow[] = [
    {
      label: 'Broken',
      prev: safe(data.previousbrokenprcntg, 0),
      week: safe(data.weeklyBrokenAvg, 0),
      month: safe(data.monthlyBrokenAvg, 0),
    },
    {
      label: 'Uncut',
      prev: safe(data.previousuncutprcntg, 0),
      week: safe(data.weeklyUncutAvg, 0),
      month: safe(data.monthlyUncutAvg, 0),
    },
    {
      label: 'NonCut',
      prev: safe(data.previousnoncutprcntg, 0),
      week: safe(data.weeklyNoncutAvg, 0),
      month: safe(data.monthlyNoncutAvg, 0),
    },
    {
      label: 'Unscoop',
      prev: safe(data.previousunscoopprcntg, 0),
      week: safe(data.weeklyUnscoopAvg, 0),
      month: safe(data.monthlyUnscoopAvg, 0),
    },
    {
      label: 'Dust',
      prev: safe(data.previousdustprcntg, 0),
      week: safe(data.weeklyDustAvg, 0),
      month: safe(data.monthlyDustAvg, 0),
    },
    {
      label: 'KOR (Prod)',
      prev: safe(data.previouskor, 0),
      week: safe(data.weeklyKORAvg, 0),
      month: safe(data.monthlyKORAvg, 0),
    },
    {
      label: 'KOR (Lab)',
      prev: safe(data.previouskorlab, 0),
      week: safe(data.weeklyKORLabAvg, 0),
      month: safe(data.monthlyKORAvglab, 0),
    },
  ]

  const bormaRows: CompareRow[] = [
    {
      label: 'Loss (Prod)',
      prev: safe(data.previousBorma, 0),
      week: safe(data.currentWeekBorma, 0),
      month: safe(data.currentMonthBorma, 0),
    },
    {
      label: 'Loss (Lab)',
      prev: safe(data.previousBormalab, 0),
      week: safe(data.currentWeekBormaLab, 0),
      month: safe(data.currentMonthBormaLab, 0),
    },
  ]

  const humidifierRows: CompareRow[] = [
    {
      label: 'Gain',
      prev: safe(data.previousHumid, 0),
      week: safe(data.currentWeekHumid, 0),
      month: safe(data.currentMonthHumid, 0),
    },
  ]

  const peelingRows: CompareRow[] = [
    {
      label: 'Broken',
      prev: safe(data.previousBroken, 0),
      week: safe(data.currentWeekBroken, 0),
      month: safe(data.currentMonthBroken, 0),
    },
    {
      label: 'Unpeel',
      prev: safe(data.previousUnpeel, 0),
      week: safe(data.currentWeekUnpeel, 0),
      month: safe(data.currentMonthUnpeel, 0),
    },
    {
      label: 'Chura',
      prev: safe(data.previousChura, 0),
      week: safe(data.currentWeekChura, 0),
      month: safe(data.currentMonthChura, 0),
    },
  ]

  const lots: LotItem[] = [
    { label: 'Boiling', icon: 'flame-outline', tint: 'orange', lot: data.latestLotboil, backlog: data.backlogMayurdata },
    { label: 'Scooping', icon: 'basket-outline', tint: 'blue', lot: data.latestLotscoop, backlog: data.backlogscoopdata },
    { label: 'Borma', icon: 'thermometer-outline', tint: 'red', lot: data.latestLotborma, vLot: data.latestvLotborma, backlog: data.backlogbormadata },
    { label: 'Humidifier', icon: 'water-outline', tint: 'teal', lot: data.latestLothumid, vLot: data.latestvLothumid, backlog: data.backloghumiddata },
    { label: 'Peeling', icon: 'cut-outline', tint: 'green', lot: data.latestLotpeel, vLot: data.latestvLotpeel, backlog: data.backlogpeeldata },
    { label: 'Mayur', icon: 'flower-outline', tint: 'violet', lot: data.latestLotMayur, vLot: data.latestVLotMayur, backlog: data.backlogMayurdata },
    { label: 'Hamsa', icon: 'diamond-outline', tint: 'teal', lot: data.latestLothamsa, vLot: data.latestVLothamsa, backlog: data.backloghamsadata },
    { label: 'Wholes', icon: 'cube-outline', tint: 'blue', lot: data.latestLotwholes, vLot: data.latestvLotwholes, backlog: data.backlogwholesdata },
    { label: 'LW', icon: 'document-text-outline', tint: 'violet', lot: data.latestLotlw, vLot: data.latestvLotlw, backlog: data.backloglwdata },
    { label: 'DPDS', icon: 'business-outline', tint: 'blue', lot: data.latestLotdpds, vLot: data.latestvLotdpds, backlog: data.backlogdpdsdata },
    { label: 'Sorting', icon: 'funnel-outline', tint: 'teal', lot: data.latestLotsorting, vLot: data.latestvLotsorting, backlog: data.backlogsortingdata },
    { label: 'Taiho', icon: 'pricetag-outline', tint: 'orange', lot: data.latestLotbigT, vLot: data.latestvLotbigT, backlog: data.backlogbigTdata },
    { label: 'Village', icon: 'home-outline', tint: 'green', lot: data.latestLotvil, vLot: data.latestvLotvil, backlog: data.backlogvildata },
    { label: 'Rejection', icon: 'close-circle-outline', tint: 'red', lot: data.latestLotrej, vLot: data.latestvLotrej, backlog: data.backlogrejdata },
  ]

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F6F8" />

      {/* Page Header */}
      <Text style={styles.pageTitle}>Kolkata Dashboard</Text>
      <Text style={styles.pageSubtitle}>Real-time operations overview</Text>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <StatCard
          icon="people-outline"
          tint="blue"
          value={String(safe(data.usercount, 0))}
          label="Active Users"
        />
        <StatCard
          icon="briefcase-outline"
          tint="orange"
          value={String(safe(data.employeecount, 0))}
          label="Employees"
        />
        <StatCard
          icon="time-outline"
          tint="teal"
          value={String(safe(data.pendingGatepass, 0))}
          label="Pending Gate"
        />
      </View>

      {/* FY Overall Report */}
      <Section title="Current FY 2026-27 Overall Report" icon="document-text-outline" tint="violet">
        <ReportRow
          icon="download-outline"
          tint="blue"
          label="Total RCN Receiving"
          value={totalReceiving}
          unit="Ton"
        />
        <ReportRow
          icon="flame-outline"
          tint="orange"
          label="Total Boiling"
          value={totalBoiling}
          unit="Ton"
        />
        <ReportRow
          icon="water-outline"
          tint="teal"
          label="Avg Moisture Gain"
          value={avgMoistureGain}
          unit="%"
        />
        <ReportRow
          icon="trending-down-outline"
          tint="red"
          label="Avg Borma Loss"
          value={avgBormaLoss}
          unit="%"
        />
        <ReportRow
          icon="arrow-down-circle-outline"
          tint="green"
          label="Village In (Gatepass)"
          value={villageIn}
          unit="Ton"
        />
        <ReportRow
          icon="arrow-up-circle-outline"
          tint="blue"
          label="Village Out (Gatepass)"
          value={villageOutGate}
          unit="Ton"
        />
        <ReportRow
          icon="business-outline"
          tint="violet"
          label="Village Out (Prod)"
          value={villageOutProd}
          unit="Ton"
        />
        <ReportRow
          icon="hourglass-outline"
          tint="orange"
          label="Pending Village (Outside)"
          value={pendingVillage}
          unit="Ton"
          isLast
        />
      </Section>

      {/* Gatepass */}
      <Section title="Gatepass" icon="car-outline" tint="blue" countLabel="Nos">
        <CompareTable rows={gatepassRows} decimals={0} />
      </Section>

      {/* Boiling */}
      <Section title="Boiling" icon="flame-outline" tint="orange" countLabel="Ton">
        <CompareTable rows={boilingRows} />
      </Section>

      {/* Scooping */}
      <Section title="Scooping" icon="basket-outline" tint="blue" countLabel="%">
        <CompareTable rows={scoopingRows} />
      </Section>

      {/* Borma */}
      <Section title="Borma" icon="thermometer-outline" tint="red" countLabel="%">
        <CompareTable rows={bormaRows} />
      </Section>

      {/* Humidifier */}
      <Section title="Humidifier" icon="water-outline" tint="teal" countLabel="%">
        <CompareTable rows={humidifierRows} />
      </Section>

      {/* Peeling */}
      <Section title="Peeling" icon="cut-outline" tint="green" countLabel="%">
        <CompareTable rows={peelingRows} />
      </Section>

      {/* Current Lot & Backlog */}
      <Section title="Current Lot & Backlog" icon="layers-outline" tint="orange" countLabel={`${lots.length} Lines`}>
        <View style={styles.lotGrid}>
          {lots.map((item) => (
            <LotCard
              key={item.label}
              label={item.label}
              icon={item.icon}
              tint={item.tint}
              currentLot={safe(item.lot?.LotNo, 'N/A')}
              vLot={item.vLot ? safe(item.vLot.LotNo, 'N/A') : undefined}
              backlogData={item.backlog}
            />
          ))}
        </View>
      </Section>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    letterSpacing: -0.6,
    marginBottom: 2,
  },
  pageSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: TEXT_MUTED,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    columnGap: 10,
    marginBottom: 16,
  },
  lotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
})
