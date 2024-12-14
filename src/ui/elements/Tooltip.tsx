import { styled } from '@mui/material/styles'
import { Tooltip, tooltipClasses, TooltipProps } from '@mui/material'

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black
  }
}))

export { BootstrapTooltip as Tooltip }
