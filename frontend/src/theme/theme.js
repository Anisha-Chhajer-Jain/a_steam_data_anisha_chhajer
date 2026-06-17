import { createTheme } from '@mui/material/styles';

export const createAppTheme = (mode = 'dark') => createTheme({
  palette: {
    mode,
    primary: {
      main: '#6c8fff',
      light: '#8fa8ff',
      dark: '#4a6be8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00d4ff',
      light: '#33ddff',
      dark: '#009ab8',
    },
    background: {
      default: mode === 'dark' ? '#0d1117' : '#f0f4ff',
      paper: mode === 'dark' ? '#161b27' : '#ffffff',
    },
    success: { main: '#00e5a0' },
    warning: { main: '#ffb700' },
    error: { main: '#ff4f6a' },
    divider: mode === 'dark' ? 'rgba(108,143,255,0.15)' : 'rgba(0,0,0,0.08)',
    text: {
      primary: mode === 'dark' ? '#e8eaf6' : '#1a1f36',
      secondary: mode === 'dark' ? '#7986cb' : '#6b7694',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    overline: {
      fontFamily: '"JetBrains Mono", "Courier New", monospace',
      fontSize: '0.65rem',
      letterSpacing: '0.12em',
      fontWeight: 700,
    },
    caption: {
      fontFamily: '"JetBrains Mono", "Courier New", monospace',
      fontSize: '0.7rem',
    },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          letterSpacing: '0.03em',
          borderRadius: 6,
          padding: '10px 24px',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #6c8fff 0%, #4a6be8 100%)',
          boxShadow: '0 4px 20px rgba(108,143,255,0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #8fa8ff 0%, #6c8fff 100%)',
            boxShadow: '0 6px 28px rgba(108,143,255,0.5)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#6c8fff',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#6c8fff',
              boxShadow: '0 0 0 3px rgba(108,143,255,0.15)',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 10,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 10,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            fontFamily: '"JetBrains Mono", "Courier New", monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 4, fontSize: '0.7rem' },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundImage: 'none' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
  },
});
