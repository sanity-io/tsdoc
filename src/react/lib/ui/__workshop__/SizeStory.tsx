import {Box} from '@sanity/ui'

import {H} from '../H'
import {Level} from '../Level'
import {P} from '../P'
import {Size} from '../Size'

export default function SizeStory(): React.ReactNode {
  return (
    <Box padding={4}>
      <Size delta={0}>
        <H size={[0, 1, 2]}>Test 1</H>
        <P size={[-1, 0, 1]}>Paragraph</P>
        <P size={[-1, 0, 1]}>Paragraph</P>
        <Level>
          <H size={[0, 1, 2]}>Test 2</H>
          <P size={[-1, 0, 1]}>Paragraph</P>
          <P size={[-1, 0, 1]}>Paragraph</P>
          <Level>
            <H size={[0, 1, 2]}>Test 3</H>
            <P size={[-1, 0, 1]}>Paragraph</P>
            <P size={[-1, 0, 1]}>Paragraph</P>
            <Level>
              <H size={[0, 1, 2]}>Test 4</H>
              <P size={[-1, 0, 1]}>Paragraph</P>
              <P size={[-1, 0, 1]}>Paragraph</P>
              <Level>
                <H size={[0, 1, 2]}>Test 5</H>
                <P size={[-1, 0, 1]}>Paragraph</P>
                <P size={[-1, 0, 1]}>Paragraph</P>
                <Level>
                  <H size={[0, 1, 2]}>Test 6</H>
                  <P size={[-1, 0, 1]}>Paragraph</P>
                  <P size={[-1, 0, 1]}>Paragraph</P>
                </Level>
              </Level>
            </Level>
          </Level>
        </Level>
        <P size={[-1, 0, 1]}>Test</P>
      </Size>

      <Size delta={-1}>
        <H size={[0, 1, 2]}>Test</H>
        <P size={[-1, 0, 1]}>Test</P>
      </Size>
    </Box>
  )
}
