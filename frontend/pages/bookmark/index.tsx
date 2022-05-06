import React from "react";
import Seo from "../../components/Seo";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from "../../components/bookmark/list";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Bookmark = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', height: '100%', border: '1px solid' }}>
      <Seo title="bookmark" />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs  value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example" centered>
          <Tab label="숙소" {...a11yProps(0)} />
          <Tab label="액티비티" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} >
        <List />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <div>총 금액</div>
    </Box>
  )
};

export default Bookmark;
