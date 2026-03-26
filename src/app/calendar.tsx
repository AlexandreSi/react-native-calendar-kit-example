import React, { useState } from "react";
import spacetime from "spacetime";
import { Platform, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
} from "@howljs/calendar-kit";

const timeZones = [
  {
    label: "Paris",
    value: "Europe/Paris",
  },
  {
    label: "Los Angeles",
    value: "America/Los_Angeles",
  },
  {
    label: "Singapore",
    value: "Asia/Singapore",
  },
];

export default function TabTwoScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const [timeZone, setTimeZone] = useState<string>("Europe/Paris");
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };
  const theme = useTheme();

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  const today = spacetime();

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle">Calendar</ThemedText>
        </ThemedView>
        <Picker
          selectedValue={timeZone}
          onValueChange={(itemValue) => setTimeZone(itemValue)}
        >
          {timeZones.map((_timeZone) => (
            <Picker.Item
              key={_timeZone.value}
              label={_timeZone.label}
              value={_timeZone.value}
            />
          ))}
        </Picker>

        <CalendarContainer
          unavailableHours={{
            [today.format("iso-short")]: [
              { start: 0, end: 600 },
              { start: 1020, end: 1440 },
            ],
          }}
          timeZone={timeZone || undefined}
        >
          <CalendarHeader />
          <CalendarBody />
        </CalendarContainer>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
  },
  titleContainer: {
    gap: Spacing.three,
    alignItems: "center",
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
  },
});
