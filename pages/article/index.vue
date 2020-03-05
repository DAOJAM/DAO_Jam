<template>
  <div class="home">
    <g-header />
    <div class="home-head">
      <h1 class="home-head__title animated fadeInUp">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcwAAAApCAMAAACP++kxAAAApVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+4/eNVAAAANnRSTlMAwXf789wPCxMhBTj4Se0sJuWHGNdMoQIczdJc6UU9MwiTmXNh4PBWvLexfGqsgm9RjmXKpcX3mSu1AAALaElEQVR42u2b53riOhCGDXYAF1wwYAwYF6opoQS4/0s7gQTNSCMRb3L6s9+vXcuovdIUydH+1Wo2td/6X8ialcNhObO03/rPq7G+3rVuaL/1X9fx+qljpP3WX61stH1o+efbQt94wHR87bf+arWC60PDPz9QOVyZlto/LMv0Utsz/43RmNVo4v+d6kxbKPDgaQIvL/HTxgub7vjPH+cWYO4ru9l9ndP+tJz4xGhIh35QvpRO18Ng4TjGuLt6nagG6telMoXofC9MK8isg3qiDdxC2SmDNmfFZfjSHZad3iOuWF9BKfJYTLWITdYcns5+DLM5CD81yGhpD5rqaRVl6ldR+niY9xS9S64gN5Qvj9nF4aob1geaTKOrVD31W92mMF5QEBIrBWWtB8rcRZVNP2pbXkEn7VPRBf2cdd92UHs/hrkMmA4SMKyrC7MyTOMq1XDa0iQ643e2Ulsf08rm+0w2GHnLbX6Xr3AZP+g2LqrzP6uhopfWJ/w531LtPkthAE/6bFrGXI+o6TtrP4Z5gtpGGtXmUbjRvg0TcEqWi7/Ab7xRRK2+vLKV/02YNmc51hQmEOOKdFp0cMSm4vt27qMxN2HTgzqSpXz4OczZc5hZfh+Dk2ffhwnSX0k1r/wLCantoqrsZfI9mAVXZngEpjRMsErK2QtoW7lgkZ1H/R14Bk6z2QVbE/7pMKmSoiwLMsfVYFIVAk3oPlglrEGsriuwfxUmmDtQRw2z24CSiU5gRjv8CLujFhfW3BWBlUZOM3XQyP8GmKAfwAQd5c0rXHO2elbX3KwMkzoO4EJgkugFwOEfpdKBTgU725euoTYZfk8C0xxt8uO+LXKNBvZy2smL/HWbDKrDbNlM6FdZOqsfi+Nm2zatijBBSxpVYNWpEVZrbf0yzEZXLB1RmDRztx0KEwwnccI9Ukdbag/6qEYC0z+7j9AR4fRHx7exA3nCuV0VZtthemWwOkNWlzvsTKwnMJ13MfsEvoEYL0Wu4AnrwnB1CgLD1EEEpor3KiIwaf1nup1hIZavfQPg3TfBC3KabFkSp5kNwf8ITuctWiKPXH7aoHBbLsgAdv69yXNZDtEaKt+14uanR9aStRe8vh6fWiqYRhqGA/9QQAeEuFgSqR5Uxc65PQi9/ZBsHVBr8pDdnkthWtRuOzaBSaJrz6AwBwEypAXMO0RZ2GkKJmg8EKpNBJiXkcN15GOObXko6N04u5KS16cwrfxK1e2pYIaffj6mCTdOYxW5gm/gHZ1AqlLhkLHZ5WGCuSTKCUyytArqaIHELarew1qFioA1kOf6NEIVCjDHwg4s0FamAEJIbjltVDDVTkyfqGA+HO2gSyaIr22sS3KFOl7KKdtcO2xilIeKBKZAJYB/hWqYNQuSYQFm6uh3uT6zIdD91gtvPRKx4g7fmxxie7n09FkQcfxVmNTcwNpTwmQV6WiR0bzEmY2paYhWaCwn1ECAGIe/BHPAmhnPYI9u1TD1HhyrCjCbE/umSZpp2mQhzkWBMlmAwDtNK4b8msKkvKhlgWn4BsxcVtPC/xqmdUH23yKHpG/ZGuxpCy6EmIYWuWQFo1AdZh2sefaGWgeYokoL0goOJpbHIAwfI050Lop6rMv4BTlNb4EyWgqTRtbAn+YI4fgXYVrMZLvHaWcdwJpRw6Qm0w3JzpvKompPJxkLPZA7/QrM5hA1skHnTmqYTkK2FYHpMwZBKmm/j1zmfoc6tUTbTg2T0WdpcrB7PS1nmzcu0ml1XdfAgf9N0ycwW2NuKTV6fRdOMxQwaU2Gz/ISeBIGJFdIpMd80A1Ye1VhLlEUhl3GmcJkhWsgoTtSmGaXPU7haY72FNunurdH85lj+0Jhdmt4s+kfzjitdZLPxpt9znU1G40tWuSNm7InMM0FtNSZ3M8oNi917SlMmlE6qZh4rCP8P90mKaGRcpHqEHerOkyrhMFzWYrrE5j9MevtlPm5iwxmc4VSBFCCQ7oNy6LZPNQiKwbcFKY7yqwBjvU+ZyW6jyR7l5Ua0F3VoYEaZnOOl8pLfxRqWiurBNNGMG0xLxnxh9M5helxMGMcF1SHaTvcTt9SKw4w932GkM3wspTBPLH17SlyoxFzmTs4th2HMAEdiAj5LoUBgZlN6v2y9nZT7PwEplZeecFh0lcwE108E9mgWEzIscIvzGzwPTNb8OdMpossoQhzm+o0BFkBTLqy5sBSCNOKxhw8PIv0kh6YIgrTNe9PdgJM6xTjfv0I5oHWtPaqwMTtLEJh5RbgZHCukKriHM9Br1aHORDTH5gp/SDCnLLdhG7EahKYqcNXIXEsl7YODmbK+sDOduMMYArxbc7DbEHQ/3OYUZ/WEyRVYBZohWd8XqL3rJsSHSUvYpyz0pDqeMtWhzmFftnWTSO0JCnMg3hHE0phjnCf5Z7dPSMDAE7zjV9a5KCdwrQQy5/D1JqFJGiukGfiLOgs5CX6W+2mi44QiVcqzoS6TLBGoFGogonDJudybzEmThnBhGZgAmQwZ/MP0UisA+3BlMPZkK5DQFgRJlp9+uJd+s9gatGsS2ieoy9h5viWEIIRlfrkcj5uSG8kV+JHVzVfE8/Trsln2TN1CExtS45GZDAj60MwB8TO8jNMdtclqwqzBEsy8XzfDn4G04q01mgtHDYYIQ+TFux1NCsDMLtUeMNxMcj6UdfJUH4BNpi/W8OZBX4VRc9RKW0J8BCYrTm/vihMtcipOCTYe3pMUxFmK+Bras7VMDcVYM5qyY3Xsug6lQ7aoyiyGjbnaYv7tLvXp6rT726Go9slop/r5HNI4XOA2slseSu0ejwIVNQaEZjcyY9jK2FOpp2TJ6PZoRdqkKSh4L4qTN/lY0jPVcOcJ2a68ZQwP/2Ovu7d2rHsI8zOUgFTv6xWq1pXF80VmMrnJ5EJP+5uuastKHP6ybYx5y7PGjAtaq0iAhPf0JWRAmZ4vnXS3RAzS11JDg4AqWZVhektuG/N7BjZDepJ3l+eKmEC+vjYM8PMfIE8icBUa4rzErV6NHimimFOYaES7dCFolqOTWBqBb49kcO0zupD4iyWXo7uyIRUg4nH4KyL0hCcAF09u6cnQDGs/a6LEsfqMHeW+mMd2o/wKXSDM++ti9qAQl6iVk5hpg5YSAEmiXK6Ejf6SgIB6jQNrzLM6O1pxEj3yEvjCcyRYuKjyjDLhnhTuXCZxgYZo00uduR3nPT+l5+W5vDLFoOQwIzW8O2HAuYenzhjUT99sWTWd2VVhqltvoCp1cmNtgImzAgIhlEN5rklDidIfVBikM9XEiVNfa9ximaG9LWe4E2Gng9a6igyJjC1BOAJMOnmm1CYFreVjhgZ8n7VYQ7mX8BsxcSEq2B6gXS2plpFmON9RI6DCg2rpCYijRWVLWnsLevfHm0xGrRnMd45BGY27dx10FQwR+jmhWoj/eJzR+LBijC1Hje3xVyEqXm8oV0/uwLLKShjqlWDOS5M+HhDcRx3knzmGB5lFe48jcrvi3n6YivaO8NTuTU9ITBBKphmoPiGlxwvuwOIunEQjWEGYD8IzMkdCOB2662A3siaOx3PUkZhgpHwOjx6fW2TWxNHRrI29ckE0j+pC11ZyG6fF4IxWB0iTapkhck7j94V9M88JJ8znNF465pEF8kXhjMH7kyIrKLGlEeszRU85exL88yeFx8Y9vDmRwOD+mWsX3V3ePS05o4VgrmJknN38f6GMb8c+W/hbajr9Fg9yWbdHRv61XHntQ2gBCBljVO5y/dtXzHCrZhnQ9HKRFM+rQVsRcadSaSpFHn7VTcwboOpddjV0lmYPZCVQ9GukeLXqNi7ZxQmtmvB4qXva3+bzHSS+pmmVsOzJ7YXatXUMD37vcJQ+xs1sE+don+cJr6lfaGW6b0PZqD9TYoGPk5L/gAvxfVHUH3xZwAAAABJRU5ErkJggg==" alt="what is dao jam?">
      </h1>
      <p class="home-head__des animated fadeInUp">And when I prophesied, Pelatiah the son of Benaiah died; and I fell on my face and cried out with a loud voice, and I said, Ah, Lord Jehovah! Are You making a full end to the remnant of Israel?And when I prophesied, Pelatiah the son of Benaiah died; and I fell on my face and cried out with a loud voice, and I said, Ah, Lord Jehovah! Are You making a full end to the remnant of Israel?</p>
      <a href="#" class="home-head__sign animated fadeInUp">SIGN IN</a>
    </div>
    <peopleList :list="judges" class="animated-list">
      <img class="judges-title" slot="title" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABDQAAABcCAMAAACm2BVsAAAAq1BMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Nr6iZAAAAOHRSTlMA4YP8DlaW9fLTirF/m+jHCgNmIxcuavkTBrflQbsy7MHacqndTSl6kc5jpJ82WkceUTy+GW1fh5G74B8AABYdSURBVHja7N3peppAFIDhg4iIGyBaXHADFVFjXOu5/ytrK+pghYF20kbjef/mOVlmxi8RlwAhRNjb9sQCQp5FW3ScCKnhSQEIeQqmr8mDTlN0nFA0yIswh/iLrYiOE4rG52tNnZWytQwg/5CLoUFLdPwZNPtcU8iIovFw8spSl2w8G2gdn/78/VdGeDYXHX8GReTSICOKxmOZujsZ74xn73S97R8wZDybiY4/A4rGF9T+NsYkxeoaCFA0KBqEMecS8tiFPRAAuntC0SAn5mqEadRZA0hm5luolX4ls9YSG3+OC6EUja9lqmEWqgskqzyGFE5XdviLvREdfwoUjS9FKd7lYTT0vOujKIyXByIaDcb0R3Kx1xQbf5ZHt8a1eBSNJ2SWMMruHaYGnDXechpGjaZAxKPBGGLjX+CZNEWKxtNp9ZCxF0oefmO5OjIqPf/wA6ORPv71l5ui8XTWEl7JCwtiOQEyfSAUDYrG68preFVuQiJljGclIBQNisbrMnt4MXgHnrZr4y8dEwhFg6Lxuqp4oVmQYltDRI0ePqFoAEXjhbl44RmQah3ggN7hiKIBQNF4XQ5eHCELw3OAUDQoGq/L1PDMA/ITRSMbisbrquOZbsDH2G++5QrlYWd5dFdNSHGonDgQYVjOPLfc7bxqZdLifJ23lV/t9bxZRWkBT78SMiDCmL5/O3rDcjX3bcPGs2gqbmnZ23kzfz5pCd/q2RIIj3/8tkwgwlxvV36hfFoy9gn+bTQmlZMDcDmVEPD1D8dlJxjtlpW5Y/1NNKyVW1rsOtXK/H1qAmNVQg3Rg3PLbH6flYfaOOh5BXf7QM/gy9cwJDXgA7SdY4BR3SX/Fi3hSS5yAhY2Rmj+Pu7bXpVVjAiO6/QuNth2vJdlZGTdn0ImxqbaxQh56Fpi0WBLIDz+8dtShavpbIARtcXmf0SjiicScFXwROZt3OR24zCoG38UDXNbGmGElFuztGGoKXxwGNMpDDDKDkqP8lqBI4bkPojL54p4T/ammY98yx3dzy8bcKtVUmNetb/OGo2GL+EdbQKp1ksbYyYVuKeoIQzZ6q1VzBIIjottCz8axlyP+7nNZ4mG4cesQLHQzx6NlXS/gJ2NeRcNsYPDOAHGCNxHeC3zWsXQEoTl/QHGk5dWtmgcbIxTrN802C1iHPuQKRpmTsZYwzfgasxsTJi8Py0r5PoeswSC40Lbwo/GZICxgvVTRMOsdzGeZ2SLhhNgLH1/Gw2xg8O0ypig6H/+3ZQShtQ9iFIGmEwumenRMAuYxI0saAeTVNv8aKSM44K3Ia6KieSC8ajRENiWSzR8TDJwniAaloaJNCtDNNoLTFJzbqIhdHAYa4TJpAl8sjGyIyfEPCLfrpUWjXwPk9WvCyphsl47LRrNMXLoDUhgLJBrZzxkNAS25RINw8NktvLw0dgOkKM4SY1GS+dl141GQ+TgMPsa8nx2NPqXYBogIO73d3E8wFtSnxsNfl5RXsFJY4Q8pZRoKKz6ci3oePpYxSipCbH2OjKy7hVylZm3i84OjQeMhui2VAH2GvKozQePxsrGKHWslztBV8YrPyUa0/HNcvUWJX/m7dgyziLREDk4TI8NBJ3qz4FFL7JrAXyyHPvBhbRGyEiFyel/pZj7t0qAjOpwozFkS7vI1VeH3OL2cvMpsAb7hPriWF99qywljNpwo9FUr9/j9b3Vp64u41WxDzGsbuTy2SQPZ+1tjn1Az0PEphvC0KB7S4lZAsFxgW3hReMHdee6piYMhOEoKFZkhXVdxeqi1YrH9bDKcv9X1qcKDmAOI6Elfn9XWsh8vJlkkmBCxWVgVX/5i3Ua2xNdaWis0hWL+a2ctJhBz82DxlvChUu/myimzGLLATQkjAM635o2UTjsBGtDjUSDxL3IkUjJ+UrMLX2kSVsFqnodDjTi6I5e+wD5byMEz9qJOZjxOdGerQSHPZ0DDftHZM1ddnIbsDGj5OuAKq/az57efoPWWrWSq3xYLPJ5q3x3oblWyezDUhkaH4nM0jqRlIbtKM1+40DD+WLW19zz9TJvD9AowjgzxgJtOxirkGh04tGJQ6RU51UgTnXt1uw60/J978ryDL769VQe+aFdEZx56fVm4lccaNSvTxvcP24XvGGSO92GpaM33qB1qBg05MNiRWGZfGaa7AD5XW+vLjT6MLQYUArMtcr1TxxoVKE259yHp35t3QNAQ944Q85Ie9guP9E4S3YW8FJy51N3jdsL6bAsb10C834fmAA+9GaTa9/QcklWB+OWkLjM+1tdfUk1ubMA7LB29Gk+Ha7v0S1ObKWgUUBYrKuvFw7vqLeFutCAsVWLN8d5ZkJjKKgTnS/kbQM0JI0Dj/xFqNqRshW/KLti1nr0PgmIPpcUMNx56egN6n38hvmK7SUCAaHoeGNLwHx7Lvc50FkE1eIQdzL5WPyHMwFRB85VlaBRRFhml+sDKmVvL6ShqwqNQ8hvgrg0ZBgsaMQ4eJkTun5rIahbhHGinPeTKKq4mHaSG5wIa0FQRKq4FHdGMo78RavhdPrXGQfBBv8pBRqgsSPMu8INPcf8Fi53MXSFoCEdFsH1+uT2A1WhsQzF7WeGoDor0dCO/IMlABryxomaVZUl43caR03iEAl1eoi1HkeALtOdK9E+XEPjRWAcdwo8aLyceAylphrz6NZHhC2nHT2COtAoLCw+Yah7G58oCo3fmMMp9RkHGl+wtpDrGoCGvHGirEfZM2tm8JrlFfB05GBO+nmxWe40CUtBCFq6hKFdGGnOgQaMTHl9p0UxRa+DOJRkrA40igrLQNxJLxWFRpubXUKBhQmNbQhhZUr3ktCQN05DkcoqS70Cgr7XoojNcdXdd4Y7G2+EJTdRKv8Q/w8rNjSmhCMYA/f6qYEp5JjCF2ivCjTkwyK+fhv/xlYSGlt4l7laMKHxjelqiJ+EhrxxJmqf7dGHPl6+dLImfNWg56K6c4E6xHSEWKnms6HRRa5b+czMdABHBHmOrwo0pMMiLqzBrzpKQqOKtPfJYEFjCWkAP9UAe8kb5yu6TtEPknVwxkKRUpsjTwjr2RnfIYwXoNbdD1n4eQ2xdKzdT4WauEvdxhVqqkDjf4SFbMKrtkpCo439RM+CAY2+BquMeWomoCFrHGBdRc1ZDTuEknBeuQb23zjDe09x5wBDt7Di8B5HY+zyf0VP8zsemDT9fL9xlagXRaAhHxbxyBUqhjsVoaFHdmgTkeYMaNQinuqEr2ECGtLGgbt5Cci/0bRNU/OxSE0KOJbYR4emTnXnLz7dUKd+eMB2KjR6NroIPc88n+YSgd7Di/pqQKOosPiY1Dr8VBEaB+6yLurT1qkZxBjRcQI05I3Thl0pgf0v2DAJaTIf23rSIPnVwn+msULzRQV1vcGpyoImjHmPV3xGtcruxG/BTaPGpkM1oFFUWLqoTdIrFaHxjd9XZdGhscaCd5BoLXnjfGjp08XyickGOWjAHlxbemWXR9Ch8WjubDioroA/Qm8LoOEjakHQPaWeb4Ptsc9qQKOgsPRcfmupDI0NOEukGh0aA+xR8IskNOSN0wqTmjSPjkrQWMO7mFcmtmoLpSmH4s42akFJj3A1ZkIDn0VrYJ/UdNa7SNGKh4Ua0JAOC6qffFMZGg80wQcdGktsquKnoCFvnGaY1ou1c5SBRhPWA+ZVG+Yxsan/ieJOE7cKTQ4aO/wXMKbwfI/JUgMaBYVl+sTQeKAJTnRo/MQWlF/T0JA3zv0puD+b3cKgUTdpahGcAvnyyUyYhfEPeq+grp+BpSSg0cVP84yh5R/TRg1oFBQW64mhMcOvJ3ABGpR70olI2a3x8sY5rcM7LV8dghebDVKCQrTWlw02pl6zhQ7/zp0LFDTGctDYE7G+MuYF5OO0VgMaecLyvNCoAjRyNQHxqNCoYG0TZKEhbxyyXVKwsSUK6Au2RufUT2hubHV2S7M8ChoDOWjM8cOtJQxXHtNUDWjkCcvzQiPe0EtrggVByODNaWxzzGlIGAcCY92Dx1Lguydn6YXkS3hk7Bx1pyxoHAm6ADmA4cpjMtWARp6wPC80pgCNXE1gc6snhxzVExnjgOya2QvT8o6kbO1F+8CwJerxA4Syy4JGDd/nrDNV6XETqUANaOQJy/NCY0SDxgg/X9ehQ2MD6w75MtPQkDcOSK9N0/lGo3xqLGWnQjcQbOTR5w1SFjTO6M+0Q1K7Fs8oqvgt1zxheV5oTGjQWOObYEuHxjey/uJ4FGiAcWTl7jZGCPJKH6H4YaSd3CfaNB2dlMxKg8YUX0rwM5nnjyeDhkRYyoGGwYVGA7VbW6ONGTQdn2zVqWs1DRfDHICGvHFAtE8cr0m5gm29PxySS0GIHfjZkS/M0qDh4U9NrWWu1ezngoZEWEqABjxom7HA28VUPDVq1A9EKJMODbuH61BbNGiAcYrRDrDxQUrWWXiqG843dfQs/WsJ0EC3dhyZfna4e3guaEiEpRRodGGzM3X54RtqazpjokIkt8H46RhVJnArNGiAcQqSbcHphSXLncAXzGRmRWYOthPflweNKnbL5/IOI4PngoZEWEqBxoGRevswekYc7EY1TcURbxljQMNHdTbvYQIaEsZB76urkLJVk/wqZxW5saMPo9bSoNHQkTvjm/dD4/1zQUMiLGVA4xfjAKWV+EBv8hnSoVHHbjkaATTofYgpSjQAGnLGQaY0pU+FwiL5yonk0DHEzfh8w/tYAjRwZyvMtfuO7Xd8388FjQLCUjw0XGEn6jMykDbGwCH92h+O0MGskYzJ5Q7AAaCBMI48Wss/CfAPe+e6piYMBNBRUFCUi3gBRVG8r3e0Ou//ZN12wYAmwRr3k37t+dfuTpWZ6TEkMQw6GFF5SIqyNqU+YKDE7y+VnD/3Pmn4zkMDDT3R3WYvPrNRRBptAWk8HC5Ylu+XRpkp7QrjCF87ezpqiwxpmPpjQ40+WxqD7FH4FinSEG4cvt7e/5i1xGXrHmTSGqHi0YTu85RjxZVZwxulwT/Qn/xeQJsqHsITuJnDa5IC8XChsny/NELmUG/LPNe8l7VcfvJZ0oA5SQGHNhJpMI/XGTWBzkZJSYPXOOLsr2p9P0WMkdqZhlEQUR3QNogZbvZLdOz3SgOLDwy5fJN6J1kDHjPupqXVE9IQCRcvy+ulYY5Yi3TuhHkXsoo702Nqj0DfT8BPwabDkQbpiUILaBwUyrNcxRrH4a0x5ehBSmO8sm4Ch1M9GpLYtMnntcVUDSnLG6XBb/BZASPmjI+iBjBx650d77+08Yw0BMLFy/J6aVy+Xsqk3aszR1Qf/GfjuRp+otKlAbXsFOwLSChz3pp6oBhr/lWdA5GGcOPY6hmy6mVCDjCXeEUtysDAqSrUSdMuRnTljN0v/umd0jjyhvqejxE9mbUqzSync0RUPN4sXesJaQiEC5fl9dJoSdFIP7z7iY/MlQZZxYglxRpm/+uAmij8LriHEZoJVDY6flLxiTTYH6jHAaQ5fDWGapMjScQbZ4y4NvmzLxPIBacKEvzABQpyTcUrk2R+nAlGVGa0wBWSMeY7pWF/vdi4CXdY7Q4yH/Y7UzGibnJ266kbztz6ONVNJjcF4uHiZXm9NAyMkKpOOnsqb4P0BWN6d/ktfb3NUo0hDQilq3L2QKGk4CfKTGdLQx7hFe1M3rkdGNd5ViIN4cYZ/K7XjrsRswj5wBxjAnW8lW+s0tAUJHQdRnKk8gnSuIGPMW14qzSaUQ+ptdsSThPSnLO+kcIq56Af27bF2eJcghhnrn9wUyAeLl6W10ujJGFMZ0w01dL4z9xskr6TVkn5Wd4x7gqmNCDAGOUiww2tbvxFRo40YF9BgmSsL8E5qK7IX66BSEO8cbqR4w40Z+RpSuM3cwmTSMf51pvJAM5sd64ZmKJoUXo7Qinv3ERd5gW8Uoc3S+M6INcXnpv6zCBozAnDuJzWzVeXyY+arM1T5PwUx1uoiEduCsTDxcvyemnAGRMUtMWPwzmoF5CwZtxEEaRhLTy5AM1Bqe6TSVy2NCChJH+eds5KiruKKw2Qu8hGqkFCGsKNExLLBLO04cqkQ/PDTsV7FAXv8KeUhugkg7RLUPIOjdq6hwnq7tulYQ0xRtXKtcavz4wRJjnKzB08JPJHaMvg7jfT4Ji47q4JFMp4pdDVCvjFnpsC8XDxsrxeGtBGLhWTuz5CUDuYYA48acip6NHivGs5p8G0MfYxQm9mSAOsMrLwd5CUhnDjhDoSJuXD4GQBWPtNw8AY/f37QRPYQ3wEzQYKmx7y6bQB3i4NMFfIZe0CnY/O7fXgDXWLnlUJKcz5KRAPFy/L66UBAXJQZ0DH4V2DFABXGmDVM1RlA0sahNBAKksbUtIQb5zTENNIek9K/TkHO7tSTJeYxXEDdE4G8tBDyIM0AH5IyGYOTEIdeagBMKghhRElBYLhwmX5fmmAV2C/kw2wsEfstE+BIQ3CHDmsTOBLg6yU3NEvueml0P0LGse6IA9lCrmjNEIehgdM3ICdnU75BDmRBoQ9ZFDZ8feoSOzrWzjApIv36E1KCsTCxcvy/dIAuY50lntg4/SRTqEF2dKAXQUZSD8AuNIgWOGlkirBxb4bQbkvaZywj0wKbz9Lg4bVWDIvsHsALubcp5dmbQPkRhrQXPjUepwt4GOvGNUf28CEdkskLWRqCsTDxcsiLg0+uwneo15MflcGPi1q0QSeNEj4uYA0+iFQpMHG3gbV1fG4Ln7sZtb9srD6qsYZjOm/r9Rysa2LQF1eJfirkgyZyNcJHkKlagPkSRoA5nl4K8R+24RsWosR3iANgxlk0Oile92mpkAwXLAs3y8NsmyhYAq16mR31p35jA8TgC8NghkYEhLIUCEtDbGDckevaxy7urzzxqjYhDxjThfaMpqA6RSMcdVz4UHkabmiS1E3jLTGHgDyJo1PZsWx0YvfJRFiNvaP7kTBKDPL1daBB3AbmhrNiNe3JjcF4uHiZRGXBh/5Q1v6UQ6Ny4O9ZYVFI1KfbowvA9oT1ng457GOET1jXHIBXiWNSAjDlzaOUypX/NgcE62WyxsTCs2WN3jKbtZn5Gafl7EUkcYNrv3kuzTtjTdz/iwl9sALbRkIYuF/fVnMmbf54wuSPxNvu/As7n4w3Qr8A/wnICwEGodTMa9l56Rk/xKxNPI9uvvP30o7P8dc/Oe/NP7zs5070EkQCsMwfNSUGCMyGwbLlRmZSwty2n//V9YWGdnQNs4Y9Pc+18DecTjs+wsC+eDwPqAI0UCNMsnFBnoQDdSmGFbcGOhBNFCfueTOOJ1oQjRQ2XmQmGP6wouGRkQDlXWLhcIyr47k7iMDRYgGqnoYi4i7MgdsxvLp2UATogHL69S4NBuXM9lZGqhCNGDx6OTil8jsSweO7Kw5nChDNFCRJwXHC0dDkxuu5pOefJm2ak0LRAMNCk9/7Ggt4icvmDryndueqV8QDTQtnchvfP7Q0IdowMJFR45xtgb6EA3YiLbu4WQMUgOFiAYsJeuelLhp+ZgWiAaac9X3O7Jn8ZjwMUOt62XuxAAWRlnY9b3gdua/3WXcsgL4H94BGTSchIGihcwAAAAASUVORK5CYII=" alt="judges">
    </peopleList>
    <peopleList :list="sponsors" class="animated-list">
      <img class="sponsors-title " slot="title" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABI4AAABcCAMAAAA/DA6cAAAAolBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8ELnaCAAAANXRSTlMA4RcNg2ab/Fb1iebAsQjc+bsmxvDWY7VDagLqEgSgIX8xT6UbSj0sqdE2ccyUj3habZhefHwY8gsAABSwSURBVHja7Nxxg6FQEADwoVZlk0KkoiWElnA73/+r3bmccnlKr71ba35/79jXvDGp1wsIIYSQ6mi84YQQUgE7MqWeMeENJ4QQTiMVj3SZN5yQb8wNrJ288OhK4HNFGHNc3vDHJEwsuR9G/emi86iHQD6VK4+7NR1PeqYRBUA+SRtP+rzhj2cd+iamOK1oQac/ktIJVQkzahtrBKR6wjnZG97wBzOLTLxCeg/rQMgvo2EbWZSGBwSA2lEVvBYySa0pnfuI3a/hLfpmBqRiJt/VlvmQF2uaqONNTkgN6bnZuzbmUbb0Q/oO9jrmAluIMcctFR8+4q3sThtztWmt8JkFKyxCCYEUJWBMBjbbwCN9Wi4+CX8cEweL6HaAPClZyTSetrpcnlfYEksBCGc7yj7HGJSJT8Ifaelz0cNCdLo18KTsJqbpxj4Q4KS+Fk1MMx+p9jlU3Y7YtLz477RJxH29qLRteHy4TfDW871vYtoYyFNyDUzovizAXzpRFxMKXdaXaEcc8d8q3z6erXYCXHDnjR6eSHSt9py8Gp5JvgdXWe+YWAOhdlTKFP9wZLhCmy51PFoCeUaCiWetAJjkNp40gVA7KsfAk5UHDPWNjoi0K/gpjQz8w5nf/stQx6OBDYTaUSkzCWPODNg8HwdAnlEDM+crpoWDiCYtrVE7KivCYsc0ofWSpxTdtYLvrdChvSLUjkobYKxGv7BJloX33RASlhYQakdlmY+5xY78E7aJJz4QAGpHn6yHMXq4n2S94ElXg4rUp0Px0FIH42a4CyDH/u03C1K0jtUXx6qxbLzN68BUX++ihmH4mzfZhVsmbzEB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" alt="sponsors">
    </peopleList>
    <div class="about animated-list">
      <div class="about-content">
        <img class="about-title" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZoAAABKCAMAAAC1kWLKAAAAolBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8ELnaCAAAANXRSTlMA/WYOFbN/VuHG0PZJm+UG8gr6qBm4lgIniTJQ6aE27dwifGtfPCy+1HHLj4RaQK5EHcN32Oo20ZQAAAgpSURBVHja7Z3ZlppAEEAbxRVlE8Hd4O6469T//1oSoW3FXk1OhMh9yUnO4GjfXqqKkqC0oM8jLJSTMgoQoaOclJGrSS25mn+G14vwcjVp4wsi6rmalDEHzD5Xky4OgCnlalJFRwOM1snVpAkfCM3/XU0wiiiiDKAbQDD0/1xNESIqKANM4J5yriY1WCbcM7ByNWlhFgcAJYgo5GrSQh2uHMI4TlvlalLCESebt+ymkatJB+1biWYPEe1cTSpYQMSMbG2wyNWkgeZdXDaDiGGuJgV4bpzN3IfRrpereT/bWIb+kHxuczVvxxmTLeyuZDN2XlHjLBrTbutcam6nfTVnXn9a9g/n0rC73gkOun75yhpx2ZcjMqxmChG9x5MHpspqgkZJA4JWuywkixH7bh3uMZuVovBsrCIu5fhdZFdN8A1XzsnbA9+KarxJFZ5Y9SW2l7INz2itzt9XUzEiIMI1HtmhVNGHCDKGbfwvKmqCrQtUziOBmMkY6GjD8G+r2QGXGUoV5/hzBk+1gaWCGr0NTIa8U6syBjZu1/pgNSOIuD9TV/j0kVbT+wEcvjzmbtoFPkv9c9W04IpdpAx6S1ZNxSC70KDePtR+GHBPdcHYzJJrzf4x0ODx0t6nqjnFJ4T/EAEP4v3kJKdmgUVU/YaFg4lLTbsbcuoC1OMIBF8bOr+jNW9U/rq71Nj/RTV9MwIixuYjqYrYNtROjS1EdKXUOPEGWG8ktA81MvCUWNhaEgGHR3feliy7cfiRwXPRpvY36S5JO8Vq/KgCNwtQkt6S10HlkxPlOYrz/JvXVfET1awh4ogeGZLgQKgm+rN+oh7zG8BMKNdza0IN+6Y1+Dw1VjWel6zbBD8CsZrrCLZZyftUY3S3nfCWxUz0Frewb/Z5airMVoCl+M0XgHC2hAsThvTtTGNntp6JTyrr49R8MY+UBkTUpNQMPHF4Du7DcR66EhXuOf6h6aepmXNGB8e1Iwk12p4bauCXatJOs3YgcxaazoepKXHumk1J2ilU05Kr0rn63UmjyfVXr/Cy+Sw1uMTc4t3F0UKhGm0h10oFO9WCAzkN25+lxufuWbi6tRGqOchGG8PkghV/KSGIl43hfJIafDuzxi/h2EWBGnHPWjBOjqVlx7mm9I2+fhbUtGo0ui93oFcEkdVFoMZ1ZGuo0Ened7iId12I8FOkhmmAXn8vKaebA5wzCG4XVC2+mqV8N2EhMWzQE18bZ8X1FKlhGPhrambCiXvGpzd/vCdISAgR5cQxN1ZokvsgNfh81YVB7xdfzQ6J0RK70gG/sphLPMLWx6hpiL8cGODftOeqOSIxg0SoXJPtrCa/xsuAGr9EY6LcgS7ubV5ztReSryDObJaJDzdUmEO99KhRMfB6B3pb5m6O1uGpOSExy0SFO37hrkLzwlFVzTajec0Q38ds8MBLy+ep6UjXUUmYZeLXFbPHibGqGj+bajwXVDB0jpo5ko6A2wlVLYUbF6GqmlY21WxBjQlNjcLnMxJnS5ucPbLlAEdVTTuTapwxqGFabDVT+c78TWI/XcnPIls5r/nOpJopqDJjq2nJR1mTRO1UK0qHkj+e1dj8EiFkUU2csKhQZ6sZSLdUkaGYkaKlAMcg5e2EGrC4d4kyqaYP6hxZakjGId5b9NuU1mRDtCOlfaFLslA2m0yqOeOlIEEVJ0BsNVvZJKr+FE1XA+GCo2RPF4k6hGVmUc0Ij7ZK5622YKqxRSdG67kZdCtZgNNtSsBQkGgu3UEW1eCRaij9dJOpBsriG93JXzgHuRitiy3I1V0JtSyqCfG3ztTWmKEz1Yx1vlxKBB6spEZHp5aKQvEptwMZNVOULjaK7+uM1wZNjbhjifzcmjbzBydeKNmmtxeaoq4Eb8xVY93WYqrANUvbUYznBg5LDTcS6BlAbUT8wruSJS5auGFiHQoa4Kw2cNUgG6dkqWKNM3PlLKjAVqPNmAdNlVHsaUDMMGDuShqjvFrgt41ah+vc46ip4o6VNIE70LVQWeaK0RvA2xv2Y4gxi7Q0n9fKPtFYAoo277uIzvUdmV2Omtot7EwRO4nmMdZANKhq4nVx0CkLbupCjDZ/OuJ/AHbeof3WFsS4e1rgho2PnkrV0fuplDlqNrQik+WgN0K2+P0LgcOSqkafa9HhVU5+tEYchjG6Qxb2bfB9L7m41wMAdrziGYznC1jHJU7asBpuFady9yV5c4beyZ4k5urhNvSoavAgwGBztMhF65qodaGvAcbw7y5FvUlV8GjjMhC0c3nu/bpa71WaY/x6IVeNflPbLF697Dd2PPXeRuml7/oe8IlNVxOcAWOX/HJhdtm0vuGeJf04mRlAsA/ddeXYL5SHJtzRtLhhNbncvf/bBRE1gsdaV9slfP6e0LsgifnAeunbHq5HVYOcFnAZMtsQTeDjsrIvnXeltkYCNaFGv2P4PnycPr54QnVZT9tYu5yB4nxirwY8BnP2LPsGFnYfidSgCVD4Rm9DN/DsfzGuGzsMNWjOnMV1RoGYnPd0SHQgfh5E8gESYjWoRJsJOnoPZKoMX35E95SlBnmbMXWcZqK6v3MZqzw9iGBRL7RjnyI1zvBpJmyK6F04AxJpKXIhX4l+VhPjzM7JD7ucOjKJ03rpQoJVN46J1Z4K9TVzBC2ChIL5oHTTQe+CDOb59a0Q+hQ1hMW2VTPjNOd7WJGfhcW+Xx9o+EE1h8JJdjnPyzU3UmB+tbo9me5NcnGhZMczrrlz0AdghftR+MonDbzFcXRSv7IYjvYdC71CEPaO804m/rOUnD/gJ0A6JZ1fK5tNAAAAAElFTkSuQmCC" alt="about">
        <p class="about-des animated">
            And when I prophesied, Pelatiah the son of Benaiah died; and I fell on my face and cried out with a loud voice, and I said, Ah, Lord Jehovah! Are You making a full end to the remnant of Israel?And when I prophesied, Pelatiah the son of Benaiah died; and I fell on my face and cried out with a loud voice, and I said, Ah, Lord Jehovah! Are You making a full end to the remnant of Israel?And when I prophesied, Pelatiah the son of Benaiah died; and I fell on my face and cried out with a loud voice, and I said, Ah, Lord Jehovah! Are You making a full end to the remnant of Israel?And when I prophesied, Pelatiah the son of Benaiah died; and I fell on my face and cried out with a loud voice, and I said, Ah, Lord Jehovah! Are You making a full end to the remnant of Israel?And when I prophesied,
        </p>
      </div>
    </div>

    <dao :list="daoList" class="animated-list">
      <img class="dao-title" slot="title" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABTYAAABYCAMAAAD4MliHAAAArlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8tivQqAAAAOXRSTlMA4dLciZsM+2qh9MHFe+8DLRjLBiQy57tlVj74FEjjCae3hE0osx6tjhDWvnhaQ5Z/kmA2c25ROoGy7t6OAAAZsklEQVR42uzdaXeiMBQG4CtUUVEBxQWlLlVxK2612vv//9icESlQlgQzOpk5eT722HB7S16VEIVZ+0oHSk7bo4EgCP+KWTuVbmjAzGh7DGBVMvuWu52tgGcSXslAqYKeEgiC8K+QMIPSkSaVrwtLejbR04T7jaa7mlzFm0GhVrF4DU8Rm4Lw/5OQrDF2bbjPBX1buI9ZngwwRtmcZsAhEZuC8P+TkIpSO2pwhwX65nAH7bjGVHK5BbwRsSkI/z8Jaa1dDfIyFfw2g7w0d42ZCj3ellJEbAoC77QPz4o5NmlIZ8hph4Ei5HSmqE12+QpOEZuCwLsSeizm2KTTnEEedhUDVRvyMJtIRdKBIyI2BYF3fyw2lU5cA+OqZ8ihjmF7yGHaiB9brqlyNf5jC/ghYlMQeEeITcZ5PnI+zuVFFSPeNKDV6mBYpwXU9hhROEz9GzZL5vZljRFLft6oi9gUBN49LjYDre1SxpDJCigd8UqZo6cHlFZzDGnWdfjBPKkYsrGBEyI2BYF3j43NgLXGgOzkG3vhr6dLQMeQMSBNIVFfxUDBBD6I2BQE3j0rNkE7FkJJVgIar+jpwwI9r0CjJIUi2oJU09Dj1pxsGxKxKQi8e3hsBlp1BX1zDShMvl9j9tHTBQraHH1KPftA5aCkDR+3vovYFATePSE2A68N9C2BTEfPMbQzXQeyA/oar0Bw6aCvAjwQsSkIvHtqbIIpoa8HRMXQ+rlLn22f6JNMIDKa6KsDB0RsCgLvnhubUJrgjdIGAmOAV1/hW5EGBhD0FbyZj4BCa4G+Kfx9IjYFgXeP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" alt="daos">
    </dao>

  </div>
</template>

<script>
import peopleList from '@/components/people_list/index.vue'
import dao from '@/components/dao/index.vue'
import loadScript from '@/utils/load_script'

export default {
  transition: 'page',
  components: {
    peopleList,
    dao
  },
  data() {
    return {
      daoLoading: false,
      sponsors: [
          {'name': 'Near', 'photoUrl': 'https://ssimg.frontenduse.top/article/2020/03/05/b0998c4c4e7b74fe0d9a7596ad57f2c4.png'},
          {
            'name': 'DAO Square',
            'photoUrl': 'https://ssimg.frontenduse.top/avatar/2020/02/19/998392f4a28ec5e0aeb64a9e695260e7.png'
          },
          {
            'name': 'DAO Fest',
            'photoUrl': 'https://ssimg.frontenduse.top/article/2020/03/05/f44e212b007a72cd3c65caec9ee9dca3.png'
          },
          {'name': 'Indie Light', 'photoUrl': 'https://ssimg.frontenduse.top/article/2020/03/05/874350184e4ce93a66baabbcffb8862c.png'},
          {'name': 'Meta Cartel', 'photoUrl': 'https://ssimg.frontenduse.top/article/2020/03/05/1ac76e868e2e591e46cc49e2e216ef03.png'},
        ],
        judges: [
          {'name': 'Illia Polosukhin', 'photoUrl': 'https://www.ethdenver.com/wp-content/uploads/2020/01/illia-250x250.jpg'},
          {'name': 'Vincent Niu', 'photoUrl': 'https://www.nft.nyc/hubfs/Vincent-photo.jpg'},
          {'name': 'Tina Zhen', 'photoUrl': 'https://pbs.twimg.com/profile_images/1177965467572428800/mWBN6yqP_400x400.jpg'}
        ],
        daoList: [
          {},{},{},{},{},{},{},{},{},{},{},{},{},{}
        ]
    }
  },
  created() {
    if (process.browser) {
      this.getDaoList()

      this.$nextTick(() => {
        const scriptSrc = [
          'https://cdn.bootcss.com/ScrollMagic/2.0.7/ScrollMagic.min.js',
        ]
        const PromiseLoadScript = scriptSrc.map(i => loadScript(i))
        Promise.all(PromiseLoadScript)
          .then(res => {
            console.log('done', res)
            if (ScrollMagic) {
              this.initScrollAnimation()
            }
          })
          .catch(err => {
            console.log('error', err)
          })
      })

    }
  },
  mounted() {

  },
  methods: {
    initScrollAnimation() {
      try {
        var controller = new ScrollMagic.Controller()

        let list = document.querySelectorAll('.animated-list')
        list.forEach((el, i) => {
          let animated = el.querySelectorAll('.animated')
          let scene = new ScrollMagic.Scene({
            triggerElement: el,
            duration: '100%',
            triggerHook: 1,
            reverse: false
          })
          .setClassToggle(animated, 'fadeInUp')
          .addTo(controller)
        })

      } catch (error) {
        console.log(error)
      }
    },
    getDaoList() {
      this.daoLoading = true
      this.$API.allToken({
        pagesize: 14
      })
        .then(res => {
          if (res.code === 0) {
            this.daoList = res.data.list
          } else {
            console.log(res.message)
          }
        })
        .catch(e => {
          console.log(e)
        })
        .finally(() => {
          this.daoLoading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  margin-top: 60px;
}
.home-head {
  height: 1120px;
  background-color: #0E2144;
  background-image: url(../../assets/img/index_head_bg.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  text-align: center;
  &__title {
    padding: 0;
    margin: 288px 0 0 0;
    color: #fff;
    font-size: 50px;
    font-weight: bolder;
    text-align: center;
    img {
      height: 41px;
    }
  }
  &__des {
    max-width: 620px;
    color: #fff;
    text-align: left;
    margin: 34px auto 0;
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
  }
  &__sign {
    display: inline-block;
    padding: 0 87px;
    height: 40px;
    background: #6236ff;
    border-radius: 34px;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    line-height: 40px;
    margin: 260px 0 0;
    text-align: center;
    transition: all .3s;
    animation-delay: 0.2s;
    &:hover {
      background: mix(#6236ff, #fff, 90%);
    }
  }
}

.judges-title {
  max-width: 544px;
  margin: 148px auto 0;
  display: block;
}
.sponsors-title {
  max-width: 589px;
  margin: 148px auto 0;
  display: block;
}
.about-title {
  max-width: 211px;
  margin: 148px auto 0;
  display: block;
}
.dao-title {
  max-width: 490px;
  margin: 148px auto 0;
  display: block;
}

.about {
  background: #0E2144;
  overflow: hidden;
  padding: 0 0 200px;
  &-content {
    padding: 0 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  &-des {
    font-size:20px;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:50px;
    padding: 0;
    max-width: 100%;
    margin: 60px auto 0;
  }
}



@media screen and (max-width: 520px) {
  .home-head__des {
    max-width: 90%;
    font-size: 14px;
  }
  .home-head__title img {
    width: 90%;
    height: auto;
  }

  .judges-title {
    max-width: (544px * 0.4);
  }
  .sponsors-title {
    max-width: (589px * 0.4);
  }
  .about-title {
    max-width: (211px * 0.4);
  }
  .dao-title {
    max-width: (490px * 0.4);
  }

  .about-des {
    font-size: 14px;
    max-width: 90%;
    line-height: 36px;
    font-weight: 400;
    animation-delay: 0.2s;
  }
}

@media screen and (min-width: 520px) {
  .home-head__des {
    max-width: 70%;
    font-size: 16px;
  }
  .home-head__title img {
    width: 70%;
    height: auto;
  }

  .judges-title {
    max-width: (544px * 0.5);
  }
  .sponsors-title {
    max-width: (589px * 0.5);
  }
  .about-title {
    max-width: (211px * 0.5);
  }
  .dao-title {
    max-width: (490px * 0.5);
  }
  .about-des {
    font-size: 16px;
    max-width: 80%;
    line-height: 46px;
    font-weight: 500;
  }
}

@media screen and (min-width: 768px) {
  .home-head__des {
    max-width: 80%;
    font-size: 18px;
  }

  .judges-title {
    max-width: (544px * 0.6);
  }
  .sponsors-title {
    max-width: (589px * 0.6);
  }
  .about-title {
    max-width: (211px * 0.6);
  }
  .dao-title {
    max-width: (490px * 0.6);
  }
}

@media screen and (min-width: 992px) {
  .home-head__des {
    max-width: 620px;
    font-size: 20px;
  }
  .home-head__title img {
    width: auto;
    height: 41px;
  }
}

@media screen and (min-width: 1200px) {
  .judges-title {
    max-width: (544px * 0.7);
  }
  .sponsors-title {
    max-width: (589px * 0.7);
  }
  .about-title {
    max-width: (211px * 0.7);
  }
  .dao-title {
    max-width: (490px * 0.7);
  }
  .about-des {
    font-size: 18px;
  }
}

@media screen and (min-width: 1920px) {
  .judges-title {
    max-width: 544px;
  }
  .sponsors-title {
    max-width: 589px;
  }
  .about-title {
    max-width: 211px;
  }
  .dao-title {
    max-width: 490px;
  }

  .about-des {
    max-width: 100%;
    font-size: 20px;
    line-height:50px;
  }
}
</style>