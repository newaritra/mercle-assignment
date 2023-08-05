import Highcharts from "highcharts";
import DarkUnica from "highcharts/themes/dark-unica";
import HighchartsReact from "highcharts-react-official";
import engagementHelper from "./EngagementHelper";
import { messageCountList } from "./db/messageCountList";
import { channels } from "./db/channels";

const EngagementMessagesOverTime = () => {
  DarkUnica(Highcharts);
  const options = engagementHelper.engagementMessageOverTimeChartOptions(
    messageCountList,
    channels
  );

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default EngagementMessagesOverTime;
