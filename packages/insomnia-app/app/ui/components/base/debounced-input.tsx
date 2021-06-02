import React, { ChangeEvent, PureComponent } from 'react';
import { autoBindMethodsForReact } from 'class-autobind-decorator';
import { AUTOBIND_CFG } from '../../../common/constants';
import { debounce } from '../../../common/misc';

interface Props {
  onChange: (value: string) => void;
  onFocus?: Function;
  onBlur?: Function;
  textarea?: boolean;
  delay?: number;
}

@autoBindMethodsForReact(AUTOBIND_CFG)
export class DebouncedInput extends PureComponent<Props> {
  _hasFocus = false;
  _input: HTMLTextAreaElement | HTMLInputElement | null = null;

  _handleChange(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const { delay, onChange } = this.props;
    const { value } = event.target;
    if (!delay) {
      onChange(value);
    } else {
      debounce(onChange, delay || 500)(value);
    }
  }

  _handleFocus(e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) {
    this._hasFocus = true;
    this.props.onFocus && this.props.onFocus(e);
  }

  _handleBlur(e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) {
    this._hasFocus = false;
    this.props.onBlur && this.props.onBlur(e);
  }

  _setRef(n: HTMLTextAreaElement | HTMLInputElement) {
    this._input = n;
  }

  setAttribute(name: string, value: string) {
    this._input?.setAttribute(name, value);
  }

  removeAttribute(name: string) {
    this._input?.removeAttribute(name);
  }

  getAttribute(name: string) {
    this._input?.getAttribute(name);
  }

  hasFocus() {
    return this._hasFocus;
  }

  getSelectionStart() {
    if (this._input) {
      return this._input.selectionStart;
    } else {
      return -1;
    }
  }

  getSelectionEnd() {
    if (this._input) {
      return this._input.selectionEnd;
    } else {
      return -1;
    }
  }

  focus() {
    this._input?.focus();
  }

  focusEnd() {
    if (this._input) {
      // Hack to focus the end (set value to current value);
      this._input.value = this.getValue();
    }
    this._input?.focus();
  }

  blur() {
    this._input?.blur();
  }

  select() {
    this._input?.select();
  }

  getValue() {
    if (this._input) {
      return this._input.value;
    } else {
      return '';
    }
  }

  render() {
    const {
      onChange,
      // eslint-disable-line @typescript-eslint/no-unused-vars
      onFocus,
      // eslint-disable-line @typescript-eslint/no-unused-vars
      onBlur,
      // eslint-disable-line @typescript-eslint/no-unused-vars
      delay,
      // eslint-disable-line @typescript-eslint/no-unused-vars
      textarea,
      ...props
    } = this.props;

    if (textarea) {
      return (
        <textarea
          ref={ref => { this._input = ref; }}
          {...props}
          onChange={this._handleChange}
          onFocus={this._handleFocus}
          onBlur={this._handleBlur}
        />
      );
    } else {
      return (
        <input
          ref={ref => { this._input = ref; }}
          {...props}
          onChange={this._handleChange}
          onFocus={this._handleFocus}
          onBlur={this._handleBlur}
        />
      );
    }
  }
}
