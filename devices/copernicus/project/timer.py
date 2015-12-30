from threading import Timer as ThreadTimer
import time

class Timer(object):
    def __init__(self, interval, interval_unit, repetitions, delay, delay_unit, action):
        self.timer = None
        self.interval = interval * Timer._unit_coefficient(interval_unit)
        self.repetitions = repetitions # negative number for infinity
        self.delay = delay * Timer._unit_coefficient(delay_unit)
        self.action = action
        self.isActive = False

    def _run(self):
        self.action()
        if (self.repetitions < 0 or self.repetitionsLeft > 0) and self.isActive:
            self.repetitionsLeft -= 1
            self.timer = ThreadTimer(self.interval, self._run)
            self.timer.start()
        else:
            self.isActive = False

    def start(self):
        if not self.isActive:
            self.isActive = True
            self.repetitionsLeft = self.repetitions - 1
            self.timer = ThreadTimer(self.delay, self._run)
            self.timer.start()

    def stop(self):
        self.timer.cancel()
        self.isActive = False

    @staticmethod
    def _unit_coefficient(unit):
        if unit == "m": return 60
        if unit == "h": return 3600
        if unit == "ms": return 0.001
        return 1
