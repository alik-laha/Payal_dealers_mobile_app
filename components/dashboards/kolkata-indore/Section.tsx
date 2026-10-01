import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import IconBox from './IconBox'
import { cardShadow, CARD_BORDER, HAIRLINE, TEXT_MUTED, TEXT_PRIMARY, TintKey } from './theme'

interface SectionProps {
  title: string
  icon?: any
  tint?: TintKey
  countLabel?: string
  children: React.ReactNode
}

export default function Section({ title, icon, tint, countLabel, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <View style={styles.titleWrap}>
          {icon && tint ? <IconBox name={icon} tint={tint} size="sm" /> : null}
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
        {countLabel ? (
          <View style={styles.countChip}>
            <Text style={styles.countChipText}>{countLabel}</Text>
          </View>
        ) : null}
      </View>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: HAIRLINE,
    borderColor: CARD_BORDER,
    ...cardShadow,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    letterSpacing: -0.2,
    flexShrink: 1,
    marginLeft: 8,
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
})
