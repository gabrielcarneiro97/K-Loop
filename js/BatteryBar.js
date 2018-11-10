class BatteryBar {
  constructor(domId) {
    this.domElement = dom.byId(domId);
    this.color = '#2962FF';

    this.bar = new ProgressBar.Circle(this.domElement, {
      strokeWidth: 15,
      easing: 'easeInOut',
      duration: 1400,
      color: this.color,
      trailColor: '#000',
      trailWidth: 1,
      svgStyle: null
    });
  }
  
  setColor(color) {
    this.color = color;
  }
  
  animate(level, color) {
    if (color) this.setColor(color);
    this.bar.animate(level, {
    duration: 0,
      step: (state, circle) => {
        circle.path.setAttribute('stroke', this.color);
        let value = Math.round(circle.value() * 100);
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText(value + '%');
        }
      },
    });
  }

  tic() {
    return new Promise((resolve) => {
      tizen.systeminfo.getPropertyValue('BATTERY', (battery) => {
        let { level, isCharging } = battery;
        if (level <= 0.3 && level > 0.2) {
          this.setColor('#FFD600');
        } else if (level <= 0.2 && level > 0.1) {
          this.setColor('#FFFF00');
        } else if (level <= 0.1) {
          this.setColor('#DD2C00');
        } else {
          this.setColor('#2962FF');
        }
    
        if (isCharging) {
          this.setColor('#00C853');
        }
    
        this.animate(level);
        resolve();
      });
    });
  }
}