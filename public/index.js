AFRAME.registerComponent('drag-raise', {
    init: function () {
        this.initialY = 0;
        this.startingY = 0;

        // デスクトップ向けのイベントリスナ
        this.el.addEventListener('mousedown', this.onDown.bind(this));
        this.el.sceneEl.addEventListener('mousemove', this.onMove.bind(this));
        this.el.addEventListener('mouseup', this.onUp.bind(this));

        // モバイル向けのイベントリスナ
        this.el.addEventListener('touchstart', this.onTouchDown.bind(this));
        this.el.sceneEl.addEventListener('touchmove', this.onTouchMove.bind(this));
        this.el.addEventListener('touchend', this.onTouchUp.bind(this));
    },

    onDown: function (evt) {
        this.startingY = evt.clientY;
        this.initialY = this.el.getAttribute('position').y;
    },

    onMove: function (evt) {
        if (!this.startingY) return;
        let deltaY = this.startingY - evt.clientY;
        this.el.setAttribute('position', {
            x: this.el.getAttribute('position').x,
            y: this.initialY + deltaY * 0.01,
            z: this.el.getAttribute('position').z
        });
    },

    onUp: function (evt) {
        this.startingY = 0;
    },

    onTouchDown: function (evt) {
        this.startingY = evt.changedTouches[0].clientY;
        this.initialY = this.el.getAttribute('position').y;
    },

    onTouchMove: function (evt) {
        if (!this.startingY) return;
        let deltaY = this.startingY - evt.changedTouches[0].clientY;
        this.el.setAttribute('position', {
            x: this.el.getAttribute('position').x,
            y: this.initialY + deltaY * 0.01,
            z: this.el.getAttribute('position').z
        });
    },

    onTouchUp: function (evt) {
        this.startingY = 0;
    }
});
