interface RefreshData {
  state: null | 'pulling' | 'reached' | 'aborting' | 'refreshing' | 'restoring';
  offset: number;
  startY?: number;
  deltaY?: number;
  touchId: number | null;
  canRefresh?: boolean;
  distance: number | null;
}

const PULLING = 'pulling';
const REACHED = 'reached';

const ABORTING = 'aborting';
const REFRESHING = 'refreshing';
const RESTORING = 'restoring';

class Refresh {
  refreshOptions = { height: 100, range: 150, offset: 50 };
  refreshData: RefreshData = { touchId: null, offset: 0, distance: null, state: null };
  pageRefresh!: HTMLElement;
  refreshControllerElem!: HTMLElement;
  refreshInnerElem!: HTMLElement;
  refreshSpinnerElem!: HTMLElement;
  onPullDownRefresh!: () => void;
  constructor(onPullDownRefresh?: () => void) {
    this.pageRefresh = document.querySelector('.page-refresh') as HTMLElement;
    this.refreshControllerElem = this.pageRefresh.querySelector('.page-refresh-content') as HTMLElement;
    this.refreshInnerElem = this.pageRefresh.querySelector('.page-refresh-inner') as HTMLElement;
    this.refreshSpinnerElem = this.pageRefresh.querySelector('.page-refresh__spinner') as HTMLElement;
    if (onPullDownRefresh) {
      this.onPullDownRefresh = onPullDownRefresh;
    }
    const rootEle = document.querySelector('body > div') as any;
    if (rootEle) {
      rootEle.addEventListener('touchstart', this._touchstart.bind(this));
      rootEle.addEventListener('touchmove', this._touchmove.bind(this));
      rootEle.addEventListener('touchend', this._touchend.bind(this));
    }
  }
  startPullDownRefresh() {
    if (!this.refreshData.state) {
      this.refreshData.state = REFRESHING;
      this._toggleClass('add');
      setTimeout(() => {
        this._refreshing();
      }, 50);
    }
  }
  stopPullDownRefresh() {
    this._restoring();
  }

  _toggleClass(type: 'add' | 'remove') {
    if (!this.refreshData.state) {
      return;
    }
    const elem = this.pageRefresh;
    if (elem) {
      elem.classList[type]('page-refresh--' + this.refreshData.state);
    }
  }

  // Determine whether the current sliding event is a group of sliding events with the sliding event, and calculate the sliding distance
  processDeltaY(evt: TouchEvent, identifier: number, startY: number) {
    const touch = Array.prototype.slice.call(evt.changedTouches).filter((touch) => touch.identifier === identifier)[0];
    if (!touch) {
      return false;
    }
    (evt as any).deltaY = touch.pageY - startY;
    return true;
  }
  // Start to touch, record the initial position of slide, judge whether the current state of the component allows another pull down refresh;
  _touchstart(event: TouchEvent) {
    const touch = event.changedTouches[0];
    this.refreshData.touchId = touch.identifier;
    this.refreshData.startY = touch.pageY;
    if (this.refreshData.state && [ABORTING, REFRESHING, RESTORING].includes(this.refreshData.state)) {
      this.refreshData.canRefresh = false;
    } else {
      this.refreshData.canRefresh = true;
    }
  }

  // In the slide, start to determine whether the component needs to be modified, and process the values required by the slide, modify the state, style
  _touchmove(event: TouchEvent) {
    if (!this.refreshData.canRefresh) {
      return;
    }

    if (this.refreshData.touchId === null || !this.processDeltaY(event, this.refreshData.touchId, this.refreshData.startY || 0)) {
      return;
    }

    if ((document.documentElement.scrollTop || document.body.scrollTop) !== 0) {
      this.refreshData.touchId = null;
      return;
    }

    let { deltaY } = event as any;
    if (deltaY < 0 && !this.refreshData.state) {
      return;
    }

    event.preventDefault();

    if (this.refreshData.distance === null) {
      this.refreshData.offset = deltaY;
      this.refreshData.state = PULLING;
      this._toggleClass('add');
    }

    deltaY = deltaY - this.refreshData.offset;
    if (deltaY < 0) {
      deltaY = 0;
    }

    this.refreshData.distance = deltaY;

    const reached = deltaY >= this.refreshOptions.range && this.refreshData.state !== REACHED;
    const pulling = deltaY < this.refreshOptions.range && this.refreshData.state !== PULLING;

    // If the pull-down distance has been reached, it needs to be reset; if not, the state becomes completed
    if (reached || pulling) {
      this._toggleClass('remove');
      this.refreshData.state = this.refreshData.state === REACHED ? PULLING : REACHED;
      this._toggleClass('add');
    }

    this._pulling(deltaY);
  }

  // After sliding, determine whether to restore component position or display continuous refresh
  _touchend(event: TouchEvent) {
    if (this.refreshData.touchId === null || !this.processDeltaY(event, this.refreshData.touchId, this.refreshData.startY || 0)) {
      return;
    }

    if (this.refreshData.state === null) {
      return;
    }

    if (this.refreshData.state === PULLING) {
      this._toggleClass('remove');
      this.refreshData.state = ABORTING;
      this._toggleClass('add');
      this._aborting(() => {
        this._toggleClass('remove');
        this.refreshData.state = this.refreshData.distance = null;
        this.refreshData.offset = 0;
      });
    } else if (this.refreshData.state === REACHED) {
      this._toggleClass('remove');
      this.refreshData.state = REFRESHING;
      this._toggleClass('add');
      this._refreshing();
    }
  }

  // In the drop-down list, modify the location of the component
  _pulling(deltaY: number) {
    const elem = this.refreshControllerElem;
    if (!elem) {
      return;
    }

    const style = elem.style;

    let rotate = deltaY / this.refreshOptions.range;

    if (rotate > 1) {
      rotate = 1;
    } else {
      rotate = rotate * rotate * rotate;
    }

    const y = Math.round(deltaY / (this.refreshOptions.range / this.refreshOptions.height));

    const transform = y ? 'translate3d(-50%, ' + y + 'px, 0)' : '';

    style.webkitTransform = transform;
    style.clip = 'rect(' + (45 - y) + 'px,45px,45px,-5px)';

    this.refreshInnerElem.style.webkitTransform = 'rotate(' + 360 * rotate + 'deg)';
  }

  // When a critical point is reached, the drop down event is released, triggering the event and notifying the Service layer to trigger the onPullDownRefresh event
  _refreshing() {
    const elem = this.refreshControllerElem;
    if (!elem) {
      return;
    }

    const style = elem.style;
    style.webkitTransition = '-webkit-transform 0.2s';
    style.webkitTransform = 'translate3d(-50%, ' + this.refreshOptions.height + 'px, 0)';

    // callback
    this.onPullDownRefresh && this.onPullDownRefresh();
  }

  // When the critical point is not reached, the drop down is released, triggering the event
  _aborting(callback: Function) {
    const elem = this.refreshControllerElem;
    if (!elem) {
      return;
    }

    const style = elem.style;

    // In the animated state, you need to return the component to its original position
    if (style.webkitTransform) {
      style.webkitTransition = '-webkit-transform 0.3s';
      style.webkitTransform = 'translate3d(-50%, 0, 0)';
      let timeout: any = null;
      const abortTransitionEnd = function () {
        timeout && clearTimeout(timeout);
        elem.removeEventListener('webkitTransitionEnd', abortTransitionEnd);
        style.webkitTransition = '';
        callback();
      };
      elem.addEventListener('webkitTransitionEnd', abortTransitionEnd);
      timeout = setTimeout(abortTransitionEnd, 350);
    } else {
      callback();
    }
  }

  // Use the API to stop the pull-down refresh and restore the component to its initial state
  _restoring() {
    if (this.refreshData.state !== REFRESHING) {
      return;
    }
    this._toggleClass('remove');
    this.refreshData.state = RESTORING;
    this._toggleClass('add');

    const elem = this.refreshControllerElem;
    if (!elem) {
      return;
    }

    const style = elem.style;
    style.webkitTransition = '-webkit-transform 0.3s';
    style.webkitTransform += ' scale(0.01)';

    let timeout: any = null;
    const restoreTransitionEnd = () => {
      timeout && clearTimeout(timeout);
      elem.removeEventListener('webkitTransitionEnd', restoreTransitionEnd);
      style.webkitTransition = '';
      style.webkitTransform = 'translate3d(-50%, 0, 0)';
      this._toggleClass('remove');
      this.refreshData.state = this.refreshData.distance = null;
      this.refreshData.offset = 0;
    };

    elem.addEventListener('webkitTransitionEnd', restoreTransitionEnd);
    timeout = setTimeout(restoreTransitionEnd, 350); // Some phones, some cases 'webkitTransitionEnd' is not triggered
  }
}

export default Refresh;
