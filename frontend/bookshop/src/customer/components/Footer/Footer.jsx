import { Button, Grid, Link, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation()
  return (
    <div>
      <Grid
        className="bg-black text-white text-center mt-10"
        container
        sx={{
          bgcolor: '#ffb0bd',
          color: 'white',
          py: 3,
        }}
      >
        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6">
            {t('welcome')}
          </Typography>
          <div>
            <Button className="pb-5" variant="h6">
              <a href="/about">{t('about')}</a>
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6">
              {t('blog')}
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6">
              {t('jobs')}
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6">
              {t('partners')}
            </Button>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6">
            {t('solutions')}
          </Typography>
          <div>
            <Button className="pb-5" variant="h6">
              {t('marketing')}
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6">
              {t('analytics')}
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6">
              {t('commerce')}
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6">
              {t('support')}
            </Button>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6">
            {t('documentation')}
          </Typography>
          <div>
            <Button className="pb-5" variant="h6">
              {t('guides')}
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6">
              {t('apiStatus')}
            </Button>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6">
            {t('legal')}
          </Typography>
          <div>
            <Button className="pb-5" variant="h6">
              {t('claims')}
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6">
              {t('privacy')}
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6">
              {t('terms')}
            </Button>
          </div>
        </Grid>
        <Grid className="pt-20" item xs={12}>
          <Typography variant="body2" component="p" align="center">
            &copy;2024 IT2-Mini Enterprise. All right reserved.
          </Typography>

          <Typography variant="body2" component="p" align="center">
            Made with love
          </Typography>

          <Typography variant="body2" component="p" align="center">
            Icons made by{' '}
            <Link
              href="https://www.freepik.com"
              color="inherit"
              underline="always"
            >
              Freepik
            </Link>{' '}
            from{' '}
            <Link
              href="https://www.flaticon.com/"
              color="inherit"
              underline="always"
            >
              www.flaticon.com
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default Footer
