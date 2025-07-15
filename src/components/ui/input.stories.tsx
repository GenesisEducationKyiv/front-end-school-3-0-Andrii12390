import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A styled input component built with shadcn/ui. Supports various input types and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
      description: 'The type of input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  args: {
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2 w-80">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="Enter your email"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input with a label for better accessibility and user experience.',
      },
    },
  },
};

export const Types: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="text">Text</Label>
        <Input
          id="text"
          type="text"
          placeholder="Enter text"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="user@example.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter password"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="number">Number</Label>
        <Input
          id="number"
          type="number"
          placeholder="Enter number"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          type="search"
          placeholder="Search..."
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different input types for various data collection needs.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label>Default</Label>
        <Input placeholder="Default state" />
      </div>
      <div className="space-y-2">
        <Label>Focused</Label>
        <Input
          placeholder="Focus to see border change"
          autoFocus
        />
      </div>
      <div className="space-y-2">
        <Label>Disabled</Label>
        <Input
          placeholder="Disabled input"
          disabled
        />
      </div>
      <div className="space-y-2">
        <Label>With value</Label>
        <Input defaultValue="This input has a value" />
      </div>
      <div className="space-y-2">
        <Label>Error state</Label>
        <Input
          placeholder="Error state"
          aria-invalid="true"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different input states including focus, disabled, and error states.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label>Search with icon</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tracks..."
            className="pl-10"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Password with toggle</Label>
        <PasswordInputExample />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input fields with icons for enhanced UX.',
      },
    },
  },
};

export const MusicPlayerExamples: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="track-title">Track Title</Label>
        <Input
          id="track-title"
          placeholder="Enter track title"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="artist">Artist</Label>
        <Input
          id="artist"
          placeholder="Enter artist name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="album">Album</Label>
        <Input
          id="album"
          placeholder="Enter album name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="search-tracks">Search Tracks</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search-tracks"
            placeholder="Search by title, artist, album..."
            className="pl-10"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input examples from the music player application.',
      },
    },
  },
};

function PasswordInputExample() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter password"
        className="pr-10"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}
