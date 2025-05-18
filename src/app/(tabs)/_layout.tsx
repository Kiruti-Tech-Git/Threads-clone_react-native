import { Tabs } from 'expo-router';
import React from 'react';
import { Feather } from '@expo/vector-icons';



export default function TabsLayout() {
    console.log('TabsLayout rendered');
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#000",
            tabBarInactiveTintColor: "#888",
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: { backgroundColor: "#fff" },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ size, color }) => (
              <Feather name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ size, color }) => (
              <Feather name="search" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: "Notifications",
            tabBarIcon: ({ size, color }) => (
              <Feather name="heart" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ size, color }) => (
              <Feather name="user" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    );
}