import {MantineProvider, Grid} from '@mantine/core';
import {ChatScreenContainer} from "./screens/Chat/ChatScreenContainer";

export const App = () => {
  return (
    <MantineProvider withNormalizeCSS>
      <Grid m={24} style={{
        height: 'calc(100vh - 48px)'
      }}>
        <Grid.Col span={4} />
        <Grid.Col span={8} style={{height: '100%'}}>
          <ChatScreenContainer />
        </Grid.Col>
      </Grid>
    </MantineProvider>
  )
}
