import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { TINTS, TintKey } from './theme'

interface IconBoxProps {
  name: any
  tint: TintKey
  size?: 'sm' | 'md'
}

export default function IconBox({ name, tint, size = 'md' }: IconBoxProps) {
  const colors = TINTS[tint]
  const isSmall = size === 'sm'

  return (
    <View
      style={[
        styles.iconBox,
        { backgroundColor: colors.bg },
        isSmall ? styles.iconBoxSm : styles.iconBoxMd,
      ]}
    >
      <Ionicons name={name} size={isSmall ? 15 : 18} color={colors.fg} />
    </View>
  )
}

const styles = StyleSheet.create({
  iconBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxMd: {
    width: 34,
    height: 34,
    borderRadius: 11,
  },
  iconBoxSm: {
    width: 28,
    height: 28,
    borderRadius: 9,
  },
})