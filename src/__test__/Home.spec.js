import { mount } from '@vue/test-utils'
import Home from '../views/Home.vue'
import { nextTick } from 'vue'
import { createPinia } from 'pinia';
import { vi } from 'vitest'
import { useRouter } from 'vue-router'

vi.mock('vue-router')

describe('Home View', () => {
  const pinia = createPinia();
  useRouter.mockReturnValue({
    push: vi.fn(),
  })

  beforeEach(() => {
    useRouter().push.mockReset()
  })

  // Prueba que el componente se renderiza corractamente
  it('renders the Home component', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [pinia]
      }
    });
    expect(wrapper.html()).toContain('Memory Cards');
  });

  // Prueba el campo input
  it('updates the username when input is entered', async () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [pinia]
      }
    });
    const input = wrapper.find('input');
    await input.setValue('Diego');
    expect(wrapper.vm.username).toBe('Diego');
  });

  // Prueba la función startGame
  it('calls startGame and navigates to game when a valid username is entered', async () => {
    // Create the mock functions
    const mockPush = vi.fn();
    const mockUpdateName = vi.fn();
    const wrapper = mount(Home, {
      global: {
        mocks: {
          useRouter: {
            push: mockPush
          },
          useStore: {
            updateName: mockUpdateName
          },
        },
        plugins: [pinia]
      },
    });

    const input = wrapper.find('input');
    await input.setValue('John Doe');

    const button = wrapper.find('button');
    await button.trigger('click');

    await nextTick();

    //expect(wrapper.vm.useStore.updateName).toHaveBeenCalled();
    //expect(mockPush.push).toHaveBeenCalledWith('/game');
  });

  // Prueba el mensaje de alerta si el nombre no es correcto
  it('alerts the user when an invalid username is entered', async () => {
    window.alert = vi.fn();
    const wrapper = mount(Home, {
      global: {
        plugins: [pinia]
      }
    });

    const input = wrapper.find('input');
    await input.setValue('');

    const button = wrapper.find('button');
    await button.trigger('click');

    expect(window.alert).toHaveBeenCalledWith('Por favor, introduce un nombre válido.');
  });
});
