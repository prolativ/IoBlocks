define(function(){
  var en = {
    actionBlockTitles: {
      led: "set led on if",
      rgb: "set led color to",
      servo: "set servo position to",
      timerStart: "start timer",
      timerStop: "stop timer"
    },

    categories: {
      actions: "Actions",
      control: "Control",
      copernicus: "Copernicus",
      functions: "Functions",
      general: "General",
      events: "Events",
      lists: "Lists",
      logic: "Logic",
      math: "Math",
      text: "Text",
      values: "Values",
      variables: "Variables"
    },

    eventBlockTitles: {
      button1: "when state of button #1 changes",
      button2: "when state of button #2 changes",
      knob: "when knob position changes",
      light: "when brightness changes",
      motion: "when state of motion sensor changes",
      timer: ["set timer", "each", "for", "times delayed", ""],
      temperature: "when temperature changes",
      text: "when text gets inserted"
    },

    valueNames: {
      button1: "button #1 pressed",
      button2: "button #2 pressed",
      knob: "knob position",
      light: "brightness",
      motion: "motion detected",
      temperature: "temperature",
      text: "inserted text"
    },

    timeUnits: {
      h: "hours",
      m: "minutes",
      ms: "milliseconds",
      s: "seconds"
    }
  };

  return en;
});