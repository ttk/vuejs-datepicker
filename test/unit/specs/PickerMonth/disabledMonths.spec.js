import PickerMonth from '@/components/PickerMonth.vue'
import { shallowMount } from '@vue/test-utils'

describe('PickerMonth', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(PickerMonth, {
      propsData: {
        allowedToShowView: () => true,

        pageDate: new Date(2018, 3, 1),
        selectedDate: new Date(2018, 3, 19),
        disabledDates: {
          to: new Date(2018, 2, 14),
          from: new Date(2018, 4, 15)
        }
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('cant select a disabled month', () => {
    const month = { isDisabled: true }
    expect(wrapper.vm.selectMonth(month)).toEqual(false)
  })

  it('can accept a customPredictor to check if the month is disabled', async () => {
    wrapper.setProps({
      disabledDates: {
        customPredictor (date) {
          if (date.getMonth() % 4 === 0) {
            return true
          }
        }
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isDisabledMonth(new Date(2018, 4, 29))).toEqual(true)
    expect(wrapper.vm.isDisabledMonth(new Date(2018, 9, 28))).toEqual(false)
    expect(wrapper.vm.isDisabledMonth(new Date(2018, 8, 24))).toEqual(true)
    expect(wrapper.vm.isDisabledMonth(new Date(2018, 2, 11))).toEqual(false)
  })
})
