import React from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import IconBox from './IconBox'
import BarChart from './BarChart'
import { GenericItem, TEXT_MUTED, TEXT_PRIMARY, TintKey } from './theme'

interface ChartModalProps {
  visible: boolean
  onClose: () => void
  title?: string
  icon?: any
  tint?: TintKey
  items: GenericItem[]
  unit: string
  showTotal?: boolean
}

export default function ChartModal({
  visible,
  onClose,
  title,
  icon,
  tint,
  items,
  unit,
  showTotal = true,
}: ChartModalProps) {
  const insets = useSafeAreaInsets()

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={onClose} />

        <View style={[styles.modalSheet, { paddingBottom: insets.bottom + 20 }]}>
          <View style={styles.dragHandle} />

          {visible && title && icon && tint && (
            <>
              <View style={styles.modalHeader}>
                <IconBox name={icon} tint={tint} size="md" />
                <View style={styles.modalHeaderText}>
                  <Text style={styles.modalTitle}>{title}</Text>
                  <Text style={styles.modalSubtitle}>
                    {items.length} origins · sorted by value
                  </Text>
                </View>
              </View>

              <BarChart items={items} tint={tint} unit={unit} showTotal={showTotal} />

              <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.8}>
                <Text style={styles.closeText}>Done</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 8,
    paddingHorizontal: 20,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  dragHandle: {
    width: 36,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingRight: 4,
  },
  modalHeaderText: {
    flex: 1,
    marginLeft: 12,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    letterSpacing: -0.2,
  },
  modalSubtitle: {
    fontSize: 12,
    color: TEXT_MUTED,
    marginTop: 2,
    fontWeight: '500',
  },
  closeButton: {
    backgroundColor: TEXT_PRIMARY,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    shadowColor: TEXT_PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
})