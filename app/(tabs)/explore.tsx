import { StyleSheet } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Text, View, FlatList } from 'react-native';

const TopicItem = ({ topic, votes }: { topic: string; votes: number }) => {
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Collapsible title={topic}></Collapsible>
      <Text style={{ padding: 5 }}>{votes}</Text>
    </View>
  );
};

interface Topic {
  topic: string;
  votes: number;
}
const mockData: Topic[] = [
  {
    topic: 'text',
    votes: 5,
  },
  {
    topic: 'text2',
    votes: 6,
  },
];

export default function TabTwoScreen() {
  return (
    <FlatList
      data={mockData}
      renderItem={({ item }) => (
        <TopicItem topic={item.topic} votes={item.votes}/>
      )}
      ListHeaderComponent={
        <ParallaxScrollView
          headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
          headerImage={
            <IconSymbol
              size={310}
              color="#808080"
              name="chevron.left.forwardslash.chevron.right"
              style={styles.headerImage}
            />
          }
        >
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Topics</ThemedText>
          </ThemedView>
        </ParallaxScrollView>
      }
    />
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
