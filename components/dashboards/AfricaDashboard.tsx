import React, { useState } from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { AfricaData } from '../../types/apiResponse.type'
import IconBox from './africa/IconBox'
import OriginSection from './africa/OriginSection'
import ChartModal from './africa/ChartModal'
import { safe, formatWithUnit, toNum, TintKey, GenericItem, TEXT_PRIMARY, TEXT_MUTED } from './africa/theme'

interface Props {
  data: AfricaData
}

type SectionConfig = {
  title: string
  icon: any
  tint: TintKey
  items: GenericItem[]
  unit: string
  totalValue?: number
  totalLabel?: string
  showTotal?: boolean
}

export default function AfricaDashboard({ data }: Props) {
  const [selectedSection, setSelectedSection] = useState<SectionConfig | null>(null)

  /* ---------------------------------- Data Logic ---------------------------------- */

  // 1. KOR (Weighted Average - ratio remains same in Tons or Kg)
  const korItems = data.pyMapData.map((p) => {
    const qty = toNum(p.totalQuantity)
    const sumKOR = toNum(p.totalSumKOR)
    return { origin: p.origin, value: qty > 0 ? sumKOR / qty : 0 }
  })

  // 2. Rate (Weighted Average - ratio remains same)
  const rateItems = data.pyMapData.map((p) => {
    const qty = toNum(p.totalQuantity)
    const sumRate = toNum(p.totalSumRate)
    return { origin: p.origin, value: qty > 0 ? sumRate / qty : 0 }
  })

  // 3. Moisture (Weighted Average - ratio remains same)
  const moistureItems = data.pyMapData.map((p) => {
    const qty = toNum(p.totalQuantity)
    const sumM = toNum(p.totalSumMoisture)
    return { origin: p.origin, value: qty > 0 ? sumM / qty : 0 }
  })

  // 4. Purchase (Converted to Tons)
  const totalPurchaseQty = data.pyMapData.reduce((s, p) => s + toNum(p.totalQuantity) / 1000, 0)
  const purchaseItems = data.pyMapData.map((p) => ({ origin: p.origin, value: toNum(p.totalQuantity) / 1000 }))
  const purchaseTotal = totalPurchaseQty

  // 5. Ideal (Converted to Tons)
  const idealItems = data.qtyAtIdealMoisture.map((q) => ({ origin: q.origin, value: toNum(q.totalQuantity) / 1000 }))
  const idealTotal = idealItems.reduce((s, i) => s + i.value, 0)

  // 6. Booked (Converted to Tons)
  const bookedItems = data.bookedQuantity.map((q) => ({ origin: q.origin, value: toNum(q.totalQuantity) / 1000 }))
  const bookedTotal = bookedItems.reduce((s, i) => s + i.value, 0)

  // 7. Total Qty (Sum of Ideal + Booked, already in Tons)
  const allOrigins = Array.from(new Set([...idealItems.map((i) => i.origin), ...bookedItems.map((i) => i.origin)]))
  const totalQtyItems = allOrigins.map((origin) => {
    const ideal = idealItems.find((i) => i.origin === origin)?.value ?? 0
    const booked = bookedItems.find((i) => i.origin === origin)?.value ?? 0
    return { origin, value: ideal + booked }
  })
  const totalQtyTotal = totalQtyItems.reduce((s, i) => s + i.value, 0)


  // 8-11. Moisture bands (Converted to Tons)
  const m810Items = data.moisture8To10.map((q) => ({ origin: q.origin, value: toNum(q.totalQuantity) / 1000 }))
  const m810Total = m810Items.reduce((s, i) => s + i.value, 0)

  const m1012Items = data.moisture10To12.map((q) => ({ origin: q.origin, value: toNum(q.totalQuantity) / 1000 }))
  const m1012Total = m1012Items.reduce((s, i) => s + i.value, 0)

  const m1214Items = data.moisture12To14.map((q) => ({ origin: q.origin, value: toNum(q.totalQuantity) / 1000 }))
  const m1214Total = m1214Items.reduce((s, i) => s + i.value, 0)

  const mAbove14Items = data.moistureAbove14.map((q) => ({ origin: q.origin, value: toNum(q.totalQuantity) / 1000 }))
  const mAbove14Total = mAbove14Items.reduce((s, i) => s + i.value, 0)

  // 12. Loss (Converted to Tons)
  const lossItems = data.lossQuantity2.map((l) => ({ origin: l.origin, value: toNum(l.lossQuantity) / 1000 }))
  const lossTotal = lossItems.reduce((s, i) => s + i.value, 0)

  // 13. Loss % (Percentage remains same)
  const lossPctItems = data.lossPercentage.map((l) => ({ origin: l.origin, value: toNum(l.lossPercentage) }))

  // Warehouse (Converted to Tons)
  const whItems = data.wareHouses.map((w) => ({ origin: w.country, value: toNum(w.totalStock) / 1000 }))
  const whTotal = whItems.reduce((s, i) => s + i.value, 0)

  /* ---------------------------------- Render ---------------------------------- */

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F6F8" />

      <Text style={styles.pageTitle}>Africa Dashboard</Text>
      <Text style={styles.pageSubtitle}>Operations Overview · Tap any card to view chart</Text>

      {/* ---------------------- STATS ROW 1 ---------------------- */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <IconBox name="business-outline" tint="blue" size="md" />
          <Text style={styles.statValue} numberOfLines={1}>
            {String(safe(data.vendorCount, 0))}
          </Text>
          <Text style={styles.statLabel} numberOfLines={1}>Vendors</Text>
        </View>

        <View style={styles.statCard}>
          <IconBox name="cube-outline" tint="orange" size="md" />
          <Text style={styles.statValue} numberOfLines={1}>
            {String(safe(data.wareHouseCount, 0))}
          </Text>
          <Text style={styles.statLabel} numberOfLines={1}>Warehouses</Text>
        </View>

        <View style={styles.statCard}>
          <IconBox name="people-outline" tint="green" size="md" />
          <Text style={styles.statValue} numberOfLines={1}>
            {String(safe(data.users[0]?.totalUsers, '0'))}
          </Text>
          <Text style={styles.statLabel} numberOfLines={1}>Users</Text>
        </View>
      </View>

      {/* ---------------------- STATS ROW 2 ---------------------- */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <IconBox name="id-card-outline" tint="violet" size="md" />
          <Text style={styles.statValue} numberOfLines={1}>
            {String(safe(data.employess[0]?.totalEmp, '0'))}
          </Text>
          <Text style={styles.statLabel} numberOfLines={1}>Employees</Text>
        </View>

        <View style={styles.statCard}>
          <IconBox name="water-outline" tint="teal" size="md" />
          <Text style={styles.statValue} numberOfLines={1}>
            {formatWithUnit(safe(data.IDEAL_MOISTURE_WT, 0), '%')}
          </Text>
          <Text style={styles.statLabel} numberOfLines={1}>Ideal Moisture</Text>
        </View>

        {/* Empty spacer to keep 3-column grid alignment */}
        <View style={{ flex: 1 }} />
      </View>

      {/* ---------------------- SECTIONS ---------------------- */}
      {/* Reorder any of the blocks below freely */}

      <OriginSection
        title="Warehouse Stock by Country"
        icon="storefront-outline"
        tint="orange"
        items={whItems}
        unit="Ton"
        totalValue={whTotal}
        onPress={() =>
          setSelectedSection({
            title: 'Warehouse Stock by Country',
            icon: 'storefront-outline',
            tint: 'orange',
            items: whItems,
            unit: 'Ton',
            totalValue: whTotal,
          })
        }
      />

      <OriginSection
        title="Buying KOR (Weighted) by Origin"
        icon="flask-outline"
        tint="violet"
        items={korItems}
        unit="KOR"
        showTotal={false}
        onPress={() =>
          setSelectedSection({
            title: 'Buying KOR (Weighted) by Origin',
            icon: 'flask-outline',
            tint: 'violet',
            items: korItems,
            unit: 'KOR',
            showTotal: false,
          })
        }
      />

      <OriginSection
        title="Buying Rate (Weighted) by Origin"
        icon="cash-outline"
        tint="orange"
        items={rateItems}
        unit="/Kg"
        showTotal={false}
        onPress={() =>
          setSelectedSection({
            title: 'Buying Rate (Weighted) by Origin',
            icon: 'cash-outline',
            tint: 'orange',
            items: rateItems,
            unit: '/Kg',
            showTotal: false,
          })
        }
      />

      <OriginSection
        title="Buying Moisture (Weighted) by Origin"
        icon="rainy-outline"
        tint="teal"
        items={moistureItems}
        unit="%"
        showTotal={false}
        onPress={() =>
          setSelectedSection({
            title: 'Buying Moisture (Weighted) by Origin',
            icon: 'rainy-outline',
            tint: 'teal',
            items: moistureItems,
            unit: '%',
            showTotal: false,
          })
        }
      />

      <OriginSection
        title="Purchase Quantity by Origin"
        icon="cart-outline"
        tint="blue"
        items={purchaseItems}
        unit="Ton"
        totalValue={purchaseTotal}
        onPress={() =>
          setSelectedSection({
            title: 'Purchase Quantity by Origin',
            icon: 'cart-outline',
            tint: 'blue',
            items: purchaseItems,
            unit: 'Ton',
            totalValue: purchaseTotal,
          })
        }
      />

      <OriginSection
        title="Quantity At Ideal Moisture by Origin"
        icon="checkmark-circle-outline"
        tint="green"
        items={idealItems}
        unit="Ton"
        totalValue={idealTotal}
        onPress={() =>
          setSelectedSection({
            title: 'Quantity At Ideal Moisture by Origin',
            icon: 'checkmark-circle-outline',
            tint: 'green',
            items: idealItems,
            unit: 'Ton',
            totalValue: idealTotal,
          })
        }
      />

      <OriginSection
        title="Booking Quantity by Origin"
        icon="calendar-outline"
        tint="blue"
        items={bookedItems}
        unit="Ton"
        totalValue={bookedTotal}
        onPress={() =>
          setSelectedSection({
            title: 'Booking Quantity by Origin',
            icon: 'calendar-outline',
            tint: 'blue',
            items: bookedItems,
            unit: 'Ton',
            totalValue: bookedTotal,
          })
        }
      />

      <OriginSection
        title="Total Quantity (Ideal + Booking)"
        icon="bar-chart-outline"
        tint="violet"
        items={totalQtyItems}
        unit="Ton"
        totalValue={totalQtyTotal}
        onPress={() =>
          setSelectedSection({
            title: 'Total Quantity (Ideal + Booking)',
            icon: 'bar-chart-outline',
            tint: 'violet',
            items: totalQtyItems,
            unit: 'Ton',
            totalValue: totalQtyTotal,
          })
        }
      />

      <OriginSection
        title="Moisture 8 – 10% by Origin"
        icon="thermometer-outline"
        tint="teal"
        items={m810Items}
        unit="Ton"
        totalValue={m810Total}
        onPress={() =>
          setSelectedSection({
            title: 'Moisture 8 – 10% by Origin',
            icon: 'thermometer-outline',
            tint: 'teal',
            items: m810Items,
            unit: 'Ton',
            totalValue: m810Total,
          })
        }
      />

      <OriginSection
        title="Moisture 10 – 12% by Origin"
        icon="thermometer-outline"
        tint="blue"
        items={m1012Items}
        unit="Ton"
        totalValue={m1012Total}
        onPress={() =>
          setSelectedSection({
            title: 'Moisture 10 – 12% by Origin',
            icon: 'thermometer-outline',
            tint: 'blue',
            items: m1012Items,
            unit: 'Ton',
            totalValue: m1012Total,
          })
        }
      />

      <OriginSection
        title="Moisture 12 – 14% by Origin"
        icon="thermometer-outline"
        tint="orange"
        items={m1214Items}
        unit="Ton"
        totalValue={m1214Total}
        onPress={() =>
          setSelectedSection({
            title: 'Moisture 12 – 14% by Origin',
            icon: 'thermometer-outline',
            tint: 'orange',
            items: m1214Items,
            unit: 'Ton',
            totalValue: m1214Total,
          })
        }
      />

      <OriginSection
        title="Moisture Above 14% by Origin"
        icon="alert-circle-outline"
        tint="red"
        items={mAbove14Items}
        unit="Ton"
        totalValue={mAbove14Total}
        onPress={() =>
          setSelectedSection({
            title: 'Moisture Above 14% by Origin',
            icon: 'alert-circle-outline',
            tint: 'red',
            items: mAbove14Items,
            unit: 'Ton',
            totalValue: mAbove14Total,
          })
        }
      />

      <OriginSection
        title="Total Loss (Dry + Pick + Adjust)"
        icon="trending-down-outline"
        tint="red"
        items={lossItems}
        unit="Ton"
        totalValue={lossTotal}
        onPress={() =>
          setSelectedSection({
            title: 'Total Loss (Dry + Pick + Adjust)',
            icon: 'trending-down-outline',
            tint: 'red',
            items: lossItems,
            unit: 'Ton',
            totalValue: lossTotal,
          })
        }
      />

      <OriginSection
        title="Loss Percentage by Origin"
        icon="pie-chart-outline"
        tint="red"
        items={lossPctItems}
        unit="%"
        showTotal={false}
        onPress={() =>
          setSelectedSection({
            title: 'Loss Percentage by Origin',
            icon: 'pie-chart-outline',
            tint: 'red',
            items: lossPctItems,
            unit: '%',
            showTotal: false,
          })
        }
      />

      {/* ---------------------- CHART MODAL ---------------------- */}
      <ChartModal
        visible={!!selectedSection}
        onClose={() => setSelectedSection(null)}
        title={selectedSection?.title}
        icon={selectedSection?.icon}
        tint={selectedSection?.tint}
        items={selectedSection?.items || []}
        unit={selectedSection?.unit || ''}
        showTotal={selectedSection?.showTotal}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 8,
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
    marginBottom: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E8EC',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    letterSpacing: -0.3,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: TEXT_MUTED,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    marginTop: 3,
    textAlign: 'center',
  },
})