import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { KolkataDataType } from '../../types/apiResponse.type'
import StatCard from './kolkata-indore/StatCard'
import ReportRow from './kolkata-indore/ReportRow'
import LotCard from './kolkata-indore/LotCard'
import { safe, TEXT_PRIMARY, TEXT_MUTED } from './kolkata-indore/theme'
import { LOT_DATA } from '@/export.data';

interface Props {
  data: KolkataDataType
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
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current FY 2026-27 Overall Report</Text>

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
      </View>

      {/* Current Lot & Backlog */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Current Lot & Backlog</Text>
          <View style={styles.countChip}>
            <Text style={styles.countChipText}>14 Lines</Text>
          </View>
        </View>

        <View style={styles.lotGrid}>
          <LotCard
            label="Boiling"
            icon="flame-outline"
            tint="orange"
            currentLot={safe(data[LOT_DATA.boil.lotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo}
            backlogData={data[LOT_DATA.boil.backlogKey] as any[] | undefined}
          />
          <LotCard
            label="Scooping"
            icon="basket-outline"
            tint="blue"
            currentLot={safe(data[LOT_DATA.scoop.lotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo}
            vLot={LOT_DATA.scoop.vLotKey ? safe(data[LOT_DATA.scoop.vLotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo : undefined}
            backlogData={data[LOT_DATA.scoop.backlogKey] as any[] | undefined}
          />
          <LotCard
            label="Borma"
            icon="thermometer-outline"
            tint="red"
            currentLot={safe(data[LOT_DATA.borma.lotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo}
            vLot={LOT_DATA.borma.vLotKey ? safe(data[LOT_DATA.borma.vLotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo : undefined}
            backlogData={data[LOT_DATA.borma.backlogKey] as any[] | undefined}
          />
          <LotCard
            label="Humidifier"
            icon="water-outline"
            tint="teal"
            currentLot={safe(data[LOT_DATA.humid.lotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo}
            vLot={LOT_DATA.humid.vLotKey ? safe(data[LOT_DATA.humid.vLotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo : undefined}
            backlogData={data[LOT_DATA.humid.backlogKey] as any[] | undefined}
          />
          <LotCard
            label="Peeling"
            icon="cut-outline"
            tint="green"
            currentLot={safe(data[LOT_DATA.peel.lotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo}
            vLot={LOT_DATA.peel.vLotKey ? safe(data[LOT_DATA.peel.vLotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo : undefined}
            backlogData={data[LOT_DATA.peel.backlogKey] as any[] | undefined}
          />
          <LotCard
            label="Mayur"
            icon="flower-outline"
            tint="violet"
            currentLot={safe(data[LOT_DATA.Mayur.lotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo}
            vLot={LOT_DATA.Mayur.vLotKey ? safe(data[LOT_DATA.Mayur.vLotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo : undefined}
            backlogData={data[LOT_DATA.Mayur.backlogKey] as any[] | undefined}
          />
          <LotCard
            label="Hamsa"
            icon="diamond-outline"
            tint="teal"
            currentLot={safe(data[LOT_DATA.hamsa.lotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo}
            vLot={LOT_DATA.hamsa.vLotKey ? safe(data[LOT_DATA.hamsa.vLotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo : undefined}
            backlogData={data[LOT_DATA.hamsa.backlogKey] as any[] | undefined}
          />
          <LotCard
            label="Wholes"
            icon="cube-outline"
            tint="blue"
            currentLot={safe(data[LOT_DATA.wholes.lotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo}
            vLot={LOT_DATA.wholes.vLotKey ? safe(data[LOT_DATA.wholes.vLotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo : undefined}
            backlogData={data[LOT_DATA.wholes.backlogKey] as any[] | undefined}
          />
          <LotCard
            label="LW"
            icon="document-text-outline"
            tint="violet"
            currentLot={safe(data[LOT_DATA.lw.lotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo}
            vLot={LOT_DATA.lw.vLotKey ? safe(data[LOT_DATA.lw.vLotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo : undefined}
            backlogData={data[LOT_DATA.lw.backlogKey] as any[] | undefined}
          />
          <LotCard
            label="DPDS"
            icon="business-outline"
            tint="blue"
            currentLot={safe(data[LOT_DATA.dpds.lotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo}
            vLot={LOT_DATA.dpds.vLotKey ? safe(data[LOT_DATA.dpds.vLotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo : undefined}
            backlogData={data[LOT_DATA.dpds.backlogKey] as any[] | undefined}
          />
          <LotCard
            label="Sorting"
            icon="funnel-outline"
            tint="teal"
            currentLot={safe(data[LOT_DATA.sorting.lotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo}
            vLot={LOT_DATA.sorting.vLotKey ? safe(data[LOT_DATA.sorting.vLotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo : undefined}
            backlogData={data[LOT_DATA.sorting.backlogKey] as any[] | undefined}
          />
          <LotCard
            label="Taiho"
            icon="pricetag-outline"
            tint="orange"
            currentLot={safe(data[LOT_DATA.bigT.lotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo}
            vLot={LOT_DATA.bigT.vLotKey ? safe(data[LOT_DATA.bigT.vLotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo : undefined}
            backlogData={data[LOT_DATA.bigT.backlogKey] as any[] | undefined}
          />
          <LotCard
            label="Village"
            icon="home-outline"
            tint="green"
            currentLot={safe(data[LOT_DATA.vil.lotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo}
            vLot={LOT_DATA.vil.vLotKey ? safe(data[LOT_DATA.vil.vLotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo : undefined}
            backlogData={data[LOT_DATA.vil.backlogKey] as any[] | undefined}
          />
          <LotCard
            label="Rejection"
            icon="close-circle-outline"
            tint="red"
            currentLot={safe(data[LOT_DATA.rej.lotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo}
            vLot={LOT_DATA.rej.vLotKey ? safe(data[LOT_DATA.rej.vLotKey] as { LotNo: string }, { LotNo: 'N/A' }).LotNo : undefined}
            backlogData={data[LOT_DATA.rej.backlogKey] as any[] | undefined}
          />
        </View>
      </View>
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
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E8EC',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    letterSpacing: -0.2,
    marginBottom: 6,
    flexShrink: 1,
  },
  countChip: {
    backgroundColor: '#F2F4F7',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  countChipText: {
    fontSize: 10,
    fontWeight: '700',
    color: TEXT_MUTED,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  lotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
})