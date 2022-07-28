import {MantineProvider, Grid, useMantineTheme} from '@mantine/core';
import {ChatScreenContainer} from "./screens/Chat/ChatScreenContainer";

export const App = () => {
  const theme = useMantineTheme();
  
  return (
    <MantineProvider withNormalizeCSS>
      <Grid m={24} style={{
        backgroundColor: theme.colors.teal[0]
      }}>
        <Grid.Col style={{height: '100%'}}>
          <ChatScreenContainer />
        </Grid.Col>
      </Grid>
    </MantineProvider>
  )
}
