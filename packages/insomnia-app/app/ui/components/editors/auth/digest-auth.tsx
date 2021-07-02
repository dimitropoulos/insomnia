import { autoBindMethodsForReact } from 'class-autobind-decorator';
import classnames from 'classnames';
import React, { PureComponent } from 'react';

import { AUTOBIND_CFG } from '../../../../common/constants';
import { HandleGetRenderContext, HandleRender } from '../../../../common/render';
import type { Request, RequestAuthentication } from '../../../../models/request';
import type { Settings } from '../../../../models/settings';
import Button from '../../base/button';
import OneLineEditor from '../../codemirror/one-line-editor';
import PasswordEditor from '../password-editor';

interface Props {
  handleRender: HandleRender;
  handleGetRenderContext: HandleGetRenderContext;
  handleUpdateSettingsShowPasswords: (arg0: boolean) => Promise<Settings>;
  nunjucksPowerUserMode: boolean;
  onChange: (arg0: Request, arg1: RequestAuthentication) => Promise<Request>;
  request: Request;
  showPasswords: boolean;
  isVariableUncovered: boolean;
}

@autoBindMethodsForReact(AUTOBIND_CFG)
class DigestAuth extends PureComponent<Props> {
  _handleDisable() {
    const { request, onChange } = this.props;
    onChange(request, { ...request.authentication, disabled: !request.authentication.disabled });
  }

  _handleChangeUsername(value: string) {
    const { request, onChange } = this.props;
    onChange(request, { ...request.authentication, username: value });
  }

  _handleChangePassword(value: string) {
    const { request, onChange } = this.props;
    onChange(request, { ...request.authentication, password: value });
  }

  render() {
    const {
      request,
      showPasswords,
      handleRender,
      nunjucksPowerUserMode,
      handleGetRenderContext,
      isVariableUncovered,
    } = this.props;
    const { authentication } = request;
    return (
      <div className="pad">
        <table>
          <tbody>
            <tr>
              <td className="pad-right no-wrap valign-middle">
                <label htmlFor="username" className="label--small no-pad">
                  Username
                </label>
              </td>
              <td className="wide">
                <div
                  className={classnames('form-control form-control--underlined no-margin', {
                    'form-control--inactive': authentication.disabled,
                  })}>
                  <OneLineEditor
                    type="text"
                    id="username"
                    disabled={authentication.disabled}
                    onChange={this._handleChangeUsername}
                    defaultValue={authentication.username || ''}
                    nunjucksPowerUserMode={nunjucksPowerUserMode}
                    render={handleRender}
                    getRenderContext={handleGetRenderContext}
                    isVariableUncovered={isVariableUncovered}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className="pad-right no-wrap valign-middle">
                <label htmlFor="password" className="label--small no-pad">
                  Password
                </label>
              </td>
              <td className="flex wide">
                <PasswordEditor
                  showAllPasswords={showPasswords}
                  disabled={authentication.disabled}
                  password={authentication.password}
                  onChange={this._handleChangePassword}
                  nunjucksPowerUserMode={nunjucksPowerUserMode}
                  handleRender={handleRender}
                  handleGetRenderContext={handleGetRenderContext}
                  isVariableUncovered={isVariableUncovered}
                />
              </td>
            </tr>
            <tr>
              <td className="pad-right no-wrap valign-middle">
                <label htmlFor="enabled" className="label--small no-pad">
                  Enabled
                </label>
              </td>
              <td className="wide">
                <div className="form-control form-control--underlined">
                  <Button
                    className="btn btn--super-duper-compact"
                    id="enabled"
                    onClick={this._handleDisable}
                    value={!authentication.disabled}
                    title={authentication.disabled ? 'Enable item' : 'Disable item'}>
                    {authentication.disabled ? (
                      <i className="fa fa-square-o" />
                    ) : (
                      <i className="fa fa-check-square-o" />
                    )}
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default DigestAuth;
