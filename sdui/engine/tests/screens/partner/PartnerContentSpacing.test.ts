import { describe, expect, it } from 'vitest';
import type { SduiElement, SduiScreen } from '../../../src/core/SduiModel.js';
import { SduiValidator } from '../../../src/core/SduiValidator.js';
import { PartnerLoginScreen } from '../../../src/screens/partner/PartnerLoginScreen.js';
import { PartnerOtpScreen } from '../../../src/screens/partner/PartnerOtpScreen.js';

type AccessoryValue = { type: string; properties: Record<string, unknown> };

function elementsOf(screen: SduiScreen): SduiElement[] {
  return screen.template.components.flatMap(component => {
    if ('elements' in component) return component.elements;
    return component.sections.flatMap(section => {
      if ('elements' in section) return section.elements;
      return section.groups.flatMap(group => group.elements);
    });
  });
}

function accessory(element: SduiElement, side: 'leading' | 'trailing'): AccessoryValue {
  const values = element.properties[side] as AccessoryValue[] | undefined;
  const value = values?.[0];
  if (!value) throw new Error(`Expected ${side} accessory on ${element.id}`);
  return value;
}

describe('Partner Login and OTP accessory spacing', () => {
  it('serializes the Login partner-label and country-code divider gaps as spacing', () => {
    const screen = new PartnerLoginScreen().build({});
    expect(() => new SduiValidator().validate(screen)).not.toThrow();

    const elements = elementsOf(screen);
    const label = elements.find(element => element.id === 'partner_label');
    const countryCode = elements.find(element => element.id === 'country_code');
    if (!label || !countryCode) throw new Error('Expected Login accessory elements');

    const leadingLabelDivider = accessory(label, 'leading');
    expect(leadingLabelDivider.properties.spacing).toEqual({ start: 0, top: 0, end: 8, bottom: 0 });
    expect(leadingLabelDivider.properties).not.toHaveProperty('padding');

    const trailingLabelDivider = accessory(label, 'trailing');
    expect(trailingLabelDivider.properties.spacing).toEqual({ start: 8, top: 0, end: 0, bottom: 0 });
    expect(trailingLabelDivider.properties).not.toHaveProperty('padding');

    const countryDivider = accessory(countryCode, 'trailing');
    expect(countryDivider.properties.spacing).toEqual({ start: 8, top: 0, end: 0, bottom: 0 });
    expect(countryDivider.properties).not.toHaveProperty('padding');
  });

  it('serializes the OTP partner-label divider gap as spacing', () => {
    const screen = new PartnerOtpScreen().build({});
    expect(() => new SduiValidator().validate(screen)).not.toThrow();

    const label = elementsOf(screen).find(element => element.id === 'otp_partner_label');
    if (!label) throw new Error('Expected OTP partner label');

    const divider = accessory(label, 'trailing');
    expect(divider.properties.spacing).toEqual({ start: 0, top: 0, end: 8, bottom: 0 });
    expect(divider.properties).not.toHaveProperty('padding');
  });
});
