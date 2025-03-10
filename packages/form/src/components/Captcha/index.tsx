﻿import { Button, Input, Form } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { InputProps } from 'antd/lib/input';
import React, { useState, useCallback, useEffect } from 'react';
import { createField } from '../../BaseForm';
import { ProFormItemProps } from '../../interface';

export type ProFormCaptchaProps = ProFormItemProps<InputProps> & {
  /**
   * @name 倒计时的秒数
   */
  countDown?: number;
  /**
   * @name 获取验证码的方法
   */
  onGetCaptcha: (mobile: string) => Promise<void>;

  /**
   * @name 渲染按钮的文字
   */
  captchaTextRender?: (timing: boolean, count: number) => React.ReactNode;

  /**
   * @name 获取按钮验证码的props
   */
  captchaProps?: ButtonProps;

  value?: any;
  onChange?: any;
};

const ProFormCaptcha: React.FC<ProFormCaptchaProps> = React.forwardRef((props, ref: any) => {
  const [count, setCount] = useState<number>(props.countDown || 60);
  const [timing, setTiming] = useState(false);
  const [loading, setLoading] = useState<ButtonProps['loading']>();
  // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props tabUtil
  const {
    rules,
    name,
    fieldProps,
    captchaTextRender = (paramsTiming, paramsCount) => {
      return paramsTiming ? `${paramsCount} 秒后重新获取` : '获取验证码';
    },
    captchaProps,
    value,
    onChange,
    ...restProps
  } = props;

  const onGetCaptcha = useCallback(async (mobile: string) => {
    try {
      setLoading({
        delay: 100,
      });
      await restProps.onGetCaptcha(mobile);
      setLoading(false);
      setTiming(true);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let interval: number = 0;
    const { countDown } = props;
    if (timing) {
      interval = window.setInterval(() => {
        setCount((preSecond) => {
          if (preSecond <= 1) {
            setTiming(false);
            clearInterval(interval);
            // 重置秒数
            return countDown || 60;
          }
          return preSecond - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timing]);

  return (
    <Form.Item noStyle shouldUpdate>
      {({ getFieldValue }) => (
        <div
          style={{
            ...fieldProps?.style,
            display: 'flex',
            alignItems: 'center',
          }}
          ref={ref}
        >
          <Input
            {...fieldProps}
            style={{
              flex: 1,
              transition: 'width .3s',
              marginRight: 8,
            }}
            value={value}
            onChange={onChange}
          />
          <Button
            style={{
              display: 'block',
            }}
            disabled={timing}
            loading={loading}
            {...captchaProps}
            onClick={() => {
              const mobile = getFieldValue('mobile');
              onGetCaptcha(mobile);
            }}
          >
            {captchaTextRender(timing, count)}
          </Button>
        </div>
      )}
    </Form.Item>
  );
});

export default createField(ProFormCaptcha);
