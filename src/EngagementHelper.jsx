class EngagementHelper {
  engagementMessageOverTimeChartOptions(messageCountList, channels) {
    const setOfChannels = [
      ...new Set(messageCountList.map((item) => item.channelId)),
    ];
    let validChannels = [];
    //We will loop over the set of channels in the messageCountList and find out which ones are having occurences more than once in the array
    //This will get rid of the channels that don't have messages on more than one date
    setOfChannels.forEach((channel) => {
      //If the occurence of messages on a channel is on more than one date then store it in validChannels array
      if (
        messageCountList.filter((msg) => msg.channelId === channel).length > 1
      )
        validChannels.push(channel);
    });

    //We are setting up the axes now
    let chart, title, tooltip, yAxis, xAxis, series, options;
    chart = { type: "spline" };
    title = { text: "Messages over Time" };
    tooltip = {
      formatter: function () {
        return `<b>${this.series.name}</b></br>${
          this.y
        } messages on ${this.x.getDate()} ${this.x.toLocaleString("default", {
          month: "short",
        })}`;
      },
    };
    //Setting the title of the y-axis
    yAxis = {
      title: {
        text: "Number of Messages",
      },
    };

    xAxis = {
      type: "datetime",
    };
    //Setting the series data
    series = validChannels.map((channel) => {
      let msgs = messageCountList.filter((msg) => msg.channelId == channel);
      //Getting the name of the label from the series of channels
      let name = channels.find((el) => el.id == channel)?.label || "";
      let data = msgs.map((msg) => ({
        x: new Date(msg.timeBucket),
        y: parseInt(msg.count),
      }));
      return { name, data };
    });
    options = { chart, title, tooltip, yAxis, xAxis, series };
    return options;
  }
}
const engagementHelper = new EngagementHelper();
export default engagementHelper;
