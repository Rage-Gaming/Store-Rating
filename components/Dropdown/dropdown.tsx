import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type DropdownMenuComponentProps = {
  buttonName: string
  items: Array<{
    label: string
    onSelect: () => void
  }>
}

export default function DropdownMenuComponent({ buttonName, items }: DropdownMenuComponentProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-[#141414] text-white border border-[#333] hover:bg-[#444444] hover:text-white cursor-pointer shadow-none" variant="outline">
          {buttonName}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          {items.map((item) => (
            <DropdownMenuItem
            key={item.label}
            className="cursor-pointer"
            onSelect={item.onSelect}
            >
              {item.label}
            <DropdownMenuSeparator />
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
