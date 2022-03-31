import '@testing-library/jest-dom'
import {render, fireEvent} from '@testing-library/svelte';
import App from '../src/App.svelte';


test('shows proper heading when rendered', () => {
    const {getByText} = render(App, {heading: 'M I S T'});
  
    expect(getByText('M I S T')).toBeInTheDocument()
  })