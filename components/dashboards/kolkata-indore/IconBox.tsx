import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { TINTS, TintKey } from './theme'

interface IconBoxProps {
  name: any
  tint: TintKey
  size?: 'sm' | 'md' | 'lg'
}

export default function IconBox({ name, tint, size = 'md' }: IconBoxProps) {
  const colors = TINTS[tint]

  const sizeMap = {
    sm: { box: 26, icon: 14, radius: 8 },
    md: { box: 34, icon: 17, radius: 11 },
    lg: { box: 42, icon: 20, radius: 14 },
  }

  const s = sizeMap[size]

  return (
    <View
      style={[
        styles.iconBox,
        {
          backgroundColor: colors.bg,
          width: s.box,
          height: s.box,
          borderRadius: s.radius,
        },
      ]}
    >
      <Ionicons name={name} size={s.icon} color={colors.fg} />
    </View>
  )
}

const styles = StyleSheet.create({
  iconBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})