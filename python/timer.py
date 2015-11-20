from threading import Timer as ThreadTimer
import time

class Timer(object):
    def __init__(self, interval, repetitions, delay, action):
        self.timer = None
        self.interval = interval
        self.repetitions = repetitions
        self.delay = delay
        self.action = action
        self.isActive = False

    def _run(self):
        self.action()
        if self.repetitionsLeft > 0 and self.isActive:
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
