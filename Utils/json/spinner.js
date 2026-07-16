/**
 * Creates a terminal spinner with a configurable message and frames.
 * @param {Object} options
 * @param {string} [options.text='Loading...'] - The initial message.
 * @param {string[]} [options.frames] - Array of frames for the spinner.
 * @param {number} [options.interval=80] - Interval between frame updates (ms).
 * @returns {Object} Spinner control methods.
 */
function createSpinner(options = {}) {
  const {
    text = '',
    frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
    interval = 80,
  } = options;

  let currentFrame = 0;
  let timer = null;
  let isSpinning = false;
  let currentText = text;

  // Helper to clear the current line
  const clearLine = () => {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
  };

  // Render the spinner with the current frame and text
  const render = () => {
    const frame = frames[currentFrame % frames.length];
    process.stdout.cursorTo(0);
    process.stdout.write(`${frame} ${currentText}`);
    currentFrame++;
  };

  // Public API
  const spinner = {
    /**
     * Starts the spinner animation. If already running, does nothing.
     */
    start() {
      if (isSpinning) return;
      // Only animate if stdout is a TTY
      if (!process.stdout.isTTY) {
        console.log(currentText);
        return;
      }
      isSpinning = true;
      clearLine();
      render();
      timer = setInterval(render, interval);
    },

    /**
     * Updates the displayed message.
     * @param {string} newText - New text to show.
     */
    setText(newText) {
      currentText = newText;
      if (isSpinning && process.stdout.isTTY) {
        clearLine();
        render();
      }
    },

    /**
     * Stops the spinner and clears the line, optionally printing a success/fail message.
     * @param {Object} [status]
     * @param {string} [status.text] - Text to show after stopping.
     * @param {string} [status.symbol] - Symbol to prepend (e.g., '✓' or '✗').
     */
    stop(status = {}) {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      isSpinning = false;
      if (process.stdout.isTTY) {
        clearLine();
        if (status.text) {
          const symbol = status.symbol || '';
          process.stdout.write(`${symbol} ${status.text}\n`);
        } else {
          // If no status, just clear the line
          process.stdout.write('\n');
        }
      } else {
        // Non‑TTY: print the final status
        if (status.text) {
          console.log(`${status.symbol || ''} ${status.text}`);
        }
      }
    },

    /**
     * Stops the spinner with a success message (✓).
     * @param {string} [msg='Done'] - Success message.
     */
    succeed(msg = 'Done') {
      this.stop({ text: msg, symbol: '✓' });
    },

    /**
     * Stops the spinner with a failure message (✗).
     * @param {string} [msg='Failed'] - Failure message.
     */
    fail(msg = 'Failed') {
      this.stop({ text: msg, symbol: '✗' });
    },
  };

  return spinner;
}

// --------------------- Example usage ---------------------
if (require.main === module) {
  const spinner = createSpinner({ text: '' });
  spinner.start();

  // Simulate a long‑running task
  setTimeout(() => {
    spinner.setText('Still installing... (almost done)');
  }, 15000);
}

module.exports = createSpinner;