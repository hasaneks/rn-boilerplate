import React from 'react'
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet'

export default function Backdrop({ ...props }) {
  return <BottomSheetBackdrop opacity={0.6} appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
}
