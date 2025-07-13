import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A checkbox component built with Radix UI Checkbox primitive and styled with shadcn/ui.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
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
  args: {},
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox with a label for better accessibility and user experience.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="unchecked" />
        <Label htmlFor="unchecked">Unchecked</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="checked"
          defaultChecked
        />
        <Label htmlFor="checked">Checked</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="disabled"
          disabled
        />
        <Label htmlFor="disabled">Disabled</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="disabled-checked"
          disabled
          defaultChecked
        />
        <Label htmlFor="disabled-checked">Disabled Checked</Label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different checkbox states including checked, unchecked, and disabled.',
      },
    },
  },
};

export const Controlled: Story = {
  render: function ControlledExample() {
    const [checked, setChecked] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="controlled"
            checked={checked}
            onCheckedChange={value => setChecked(value === true)}
          />
          <Label htmlFor="controlled">{checked ? 'Checked' : 'Unchecked'} (controlled)</Label>
        </div>
        <div className="text-sm text-muted-foreground">State: {checked ? 'true' : 'false'}</div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A controlled checkbox that manages its state externally.',
      },
    },
  },
};

export const MultipleCheckboxes: Story = {
  render: function MultipleExample() {
    const [preferences, setPreferences] = useState({
      notifications: false,
      marketing: false,
      updates: true,
    });

    const handleChange = (key: keyof typeof preferences) => (checked: boolean) => {
      setPreferences(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div className="space-y-4">
        <div className="text-sm font-medium">Email Preferences</div>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="notifications"
              checked={preferences.notifications}
              onCheckedChange={handleChange('notifications')}
            />
            <Label htmlFor="notifications">Email notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="marketing"
              checked={preferences.marketing}
              onCheckedChange={handleChange('marketing')}
            />
            <Label htmlFor="marketing">Marketing emails</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="updates"
              checked={preferences.updates}
              onCheckedChange={handleChange('updates')}
            />
            <Label htmlFor="updates">Product updates</Label>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple checkboxes for selecting preferences or options.',
      },
    },
  },
};

export const MusicPlayerExamples: Story = {
  render: function MusicPlayerExample() {
    const [selectedTracks, setSelectedTracks] = useState<string[]>([]);

    const tracks = [
      { id: '1', title: 'Song One', artist: 'Artist A' },
      { id: '2', title: 'Song Two', artist: 'Artist B' },
      { id: '3', title: 'Song Three', artist: 'Artist C' },
    ];

    const handleTrackSelect = (trackId: string) => (checked: boolean) => {
      if (checked) {
        setSelectedTracks(prev => [...prev, trackId]);
      } else {
        setSelectedTracks(prev => prev.filter(id => id !== trackId));
      }
    };

    const selectAll = () => {
      setSelectedTracks(tracks.map(t => t.id));
    };

    const clearAll = () => {
      setSelectedTracks([]);
    };

    return (
      <div className="space-y-4 w-80">
        <div className="flex justify-between">
          <div className="text-sm font-medium">Select Tracks</div>
          <div className="space-x-2">
            <button
              onClick={selectAll}
              className="text-xs text-blue-600 hover:underline"
            >
              Select All
            </button>
            <button
              onClick={clearAll}
              className="text-xs text-gray-600 hover:underline"
            >
              Clear
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {tracks.map(track => (
            <div
              key={track.id}
              className="flex items-center space-x-3"
            >
              <Checkbox
                id={track.id}
                checked={selectedTracks.includes(track.id)}
                onCheckedChange={handleTrackSelect(track.id)}
              />
              <div className="flex-1">
                <div className="text-sm font-medium">{track.title}</div>
                <div className="text-xs text-muted-foreground">{track.artist}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-muted-foreground">
          {selectedTracks.length} of {tracks.length} tracks selected
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkbox examples from the music player for track selection.',
      },
    },
  },
};
