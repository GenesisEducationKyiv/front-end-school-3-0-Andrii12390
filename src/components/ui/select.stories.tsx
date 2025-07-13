import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Music, Calendar, Users, Star } from 'lucide-react';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A select component built with Radix UI Select primitive for choosing from a list of options.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[200px]">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
          <SelectItem value="option4">Option 4</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A basic select component with simple options.',
      },
    },
  },
};

export const WithGroups: Story = {
  render: () => (
    <div className="w-[250px]">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a framework" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Frontend Frameworks</SelectLabel>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="vue">Vue</SelectItem>
            <SelectItem value="angular">Angular</SelectItem>
            <SelectItem value="svelte">Svelte</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Backend Frameworks</SelectLabel>
            <SelectItem value="express">Express</SelectItem>
            <SelectItem value="fastify">Fastify</SelectItem>
            <SelectItem value="nest">NestJS</SelectItem>
            <SelectItem value="koa">Koa</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A select with grouped options and separators for better organization.',
      },
    },
  },
};

export const Controlled: Story = {
  render: function ControlledExample() {
    const [value, setValue] = useState<string>('');

    return (
      <div className="space-y-4 w-[200px]">
        <div>
          <Label htmlFor="controlled-select">Choose a color</Label>
          <Select
            value={value}
            onValueChange={setValue}
          >
            <SelectTrigger id="controlled-select">
              <SelectValue placeholder="Select a color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="red">Red</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="yellow">Yellow</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-muted-foreground">Selected value: {value || 'None'}</div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setValue('')}
          disabled={!value}
        >
          Clear Selection
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A controlled select that maintains its state externally.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="w-[250px]">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="music">
            <span className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              Music
            </span>
          </SelectItem>
          <SelectItem value="events">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </span>
          </SelectItem>
          <SelectItem value="people">
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              People
            </span>
          </SelectItem>
          <SelectItem value="favorites">
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Favorites
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A select with icons in the options for better visual identification.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm mb-2 block">Small size</Label>
        <Select>
          <SelectTrigger
            size="sm"
            className="w-[180px]"
          >
            <SelectValue placeholder="Small select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small1">Small option 1</SelectItem>
            <SelectItem value="small2">Small option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm mb-2 block">Default size</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Default select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default1">Default option 1</SelectItem>
            <SelectItem value="default2">Default option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select components in different sizes for various UI contexts.',
      },
    },
  },
};

export const MusicPlayerExamples: Story = {
  render: function MusicPlayerExample() {
    const [genre, setGenre] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('');

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Filter by Genre</Label>
          <Select
            value={genre}
            onValueChange={setGenre}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All genres" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Popular Genres</SelectLabel>
                <SelectItem value="rock">Rock</SelectItem>
                <SelectItem value="pop">Pop</SelectItem>
                <SelectItem value="hip-hop">Hip Hop</SelectItem>
                <SelectItem value="electronic">Electronic</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Other Genres</SelectLabel>
                <SelectItem value="jazz">Jazz</SelectItem>
                <SelectItem value="classical">Classical</SelectItem>
                <SelectItem value="folk">Folk</SelectItem>
                <SelectItem value="r&b">R&B</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Sort by</Label>
          <Select
            value={sortBy}
            onValueChange={setSortBy}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Default order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title-asc">
                <span className="flex items-center gap-2">
                  <Music className="h-4 w-4" />
                  Title (A-Z)
                </span>
              </SelectItem>
              <SelectItem value="title-desc">
                <span className="flex items-center gap-2">
                  <Music className="h-4 w-4" />
                  Title (Z-A)
                </span>
              </SelectItem>
              <SelectItem value="artist-asc">
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Artist (A-Z)
                </span>
              </SelectItem>
              <SelectItem value="artist-desc">
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Artist (Z-A)
                </span>
              </SelectItem>
              <SelectItem value="date-newest">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Newest first
                </span>
              </SelectItem>
              <SelectItem value="date-oldest">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Oldest first
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Playback Speed</Label>
          <Select defaultValue="1.0">
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.5">0.5x</SelectItem>
              <SelectItem value="0.75">0.75x</SelectItem>
              <SelectItem value="1.0">1.0x (Normal)</SelectItem>
              <SelectItem value="1.25">1.25x</SelectItem>
              <SelectItem value="1.5">1.5x</SelectItem>
              <SelectItem value="2.0">2.0x</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="p-4 bg-muted rounded-md text-sm">
          <h4 className="font-medium mb-2">Current Filters:</h4>
          <p>Genre: {genre || 'All genres'}</p>
          <p>Sort: {sortBy || 'Default order'}</p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Select examples from the music player application for filtering and sorting.',
      },
    },
  },
};
